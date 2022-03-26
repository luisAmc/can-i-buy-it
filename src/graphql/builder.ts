import { db } from 'src/utils/prisma';
import { IncomingMessage, OutgoingMessage } from 'http';
import { Session } from '@prisma/client';
import PrismaPlugin from '@pothos/plugin-prisma';
import RelayPlugin from '@pothos/plugin-relay';
import SchemaBuilder from '@pothos/core';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import type PrismaTypes from '@pothos/plugin-prisma/generated';

export interface Context {
  req: IncomingMessage;
  res: OutgoingMessage;
  session?: Session | null;
}

export function createGraphQLContext(
  req: IncomingMessage,
  res: OutgoingMessage,
  session?: Session | null
): Context {
  return {
    req,
    res,
    session
  };
}

export const builder = new SchemaBuilder<{
  DefaultInputFieldRequiredness: true;
  PrismaTypes: PrismaTypes;
  Context: Context;
  AuthScopes: {
    public: boolean;
    user: boolean;
    unauthenticated: boolean;
  };
  Scalars: {
    ID: { Input: string; Output: string };
    DateTime: { Input: Date; Output: Date };
  };
}>({
  plugins: [RelayPlugin, PrismaPlugin, ScopeAuthPlugin, SimpleObjectsPlugin],
  authScopes: async ({ session }) => ({
    public: true,
    user: !!session,
    unauthenticated: !session
  }),
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String'
  },
  prisma: {
    client: db
  },
  defaultInputFieldRequiredness: true
});

// This initializes the query and mutation types so that we can add fields to them dynamically:
builder.queryType({
  authScopes: { user: true }
});

builder.mutationType({
  authScopes: { user: true }
});

// Provide the custom DateTime scalar that allows dates to be transmitted over GraphQL:
builder.scalarType('DateTime', {
  serialize: (date) => date.toISOString(),
  parseValue: (date: any) => {
    return new Date(date);
  }
});
