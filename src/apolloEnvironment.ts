import {
  ApolloClient,
  ApolloError,
  HttpLink,
  InMemoryCache,
  QueryOptions
} from '@apollo/client';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useMemo } from 'react';

export interface SessionProps {
  props: {
    me: {
      username: string;
    };
  };
}

let apolloClient: ApolloClient<any>;

export async function preloadQuery(
  sessionProps: SessionProps,
  context: GetServerSidePropsContext,
  ...queries: QueryOptions[]
): Promise<GetServerSidePropsResult<{}>> {
  const client = createApolloClient({
    headers: context.req.headers as Record<string, string>
  });

  try {
    await Promise.all(
      queries.map((queryOptions) => client.query(queryOptions))
    );

    return {
      props: {
        ...sessionProps.props,
        initialClientState: client.cache.extract()
      }
    };
  } catch (e) {
    if (e instanceof ApolloError) {
      const notFoundError = e.graphQLErrors.find((error: Error) => {
        return (error as any)?.extensions.code === 404;
      });

      if (notFoundError) {
        return {
          notFound: true
        };
      }
    }

    return { props: {} };
  }
}

export function useApollo(initialState?: Record<string, any>) {
  const client = useMemo(
    () => createApolloClient({ initialState }),
    [initialState]
  );

  return client;
}

interface ClientOptions {
  headers?: Record<string, string>;
  initialState?: Record<string, any>;
}

export function createApolloClient({ initialState, headers }: ClientOptions) {
  let nextClient = apolloClient;

  if (!nextClient) {
    nextClient = new ApolloClient({
      ssrMode: typeof window === 'undefined',
      credentials: 'include',
      link: new HttpLink({
        uri:
          typeof window === 'undefined'
            ? 'http://localhost:3000/api/graphql'
            : '/api/graphql',
        headers: {
          ...headers,
          'X-CSRF-Trick': 'canIBuyIt'
        }
      }),
      cache: new InMemoryCache({
        typePolicies: {
          User: {
            fields: {
              transactions: {
                keyArgs: ['id']
              },
              budgets: {
                keyArgs: ['id']
              }
            }
          }
        }
      })
    });
  }

  if (initialState) {
    const existingCache = nextClient.extract();
    nextClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === 'undefined') return nextClient;

  if (!apolloClient) apolloClient = nextClient;

  return nextClient;
}
