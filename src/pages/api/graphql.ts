import { builder, Context, createGraphQLContext } from 'src/graphql/builder';
import { IncomingHttpHeaders } from 'http';
import { lexicographicSortSchema, printSchema } from 'graphql';
import { NextApiHandler } from 'next';
import { resolveSession } from 'src/utils/sessions';
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL
} from 'graphql-helix';
import 'src/graphql/resolvers';
import fs from 'fs';

const schema = builder.toSchema({});

fs.writeFileSync(
  './schema.graphql',
  printSchema(lexicographicSortSchema(schema))
);

interface GraphQLRequest {
  body?: any;
  headers: IncomingHttpHeaders;
  method: string;
  query: any;
}

const handler: NextApiHandler = async (req, res) => {
  if (
    req.method === 'POST' &&
    req.headers['x-csrf-trick'] !== 'canIBuyIt'
  ) {
    res.status(400);
    res.end('Missing CSRF verification.');
    return;
  }

  const session = await resolveSession({ req, res });

  try {
    // Create a generic Request object that can be consumed by Graphql Helix's API
    const request: GraphQLRequest = {
      body: req.body,
      headers: req.headers,
      method: req.method ?? 'GET',
      query: req.query
    };

    // Determine whether we should render GraphiQL instead of returning an API response
    if (shouldRenderGraphiQL(request)) {
      res.send(
        renderGraphiQL({
          endpoint: '/api/graphql',
          headers: JSON.stringify({ 'X-CSRF-Trick': 'canIBuyIt' })
        })
      );
    } else {
      // Extract the Graphql parameters from the request
      const { operationName, query, variables } = getGraphQLParameters(request);

      // Validate and execute the query
      const result = await processRequest<Context>({
        operationName,
        query,
        variables,
        request,
        schema,
        contextFactory: () => createGraphQLContext(req, res, session)
      });

      // processRequest returns one of three types of results depending on how the server should respond
      // 1) RESPONSE: a regular JSON payload
      // 2) MULTIPART RESPONSE: a multipart response (when @stream or @defer directives are used)
      // 3) PUSH: a stream of events to push back down the client for a subscription
      // The "sendResult" is a NodeJS-only shortcut for handling all possible types of Graphql responses,
      // See "Advanced Usage" below for more details and customizations available on that layer.
      sendResult(result, res);
    }
  } catch (err) {
    res.status(500);
    res.end(String(err));
  }
};

export default handler;
