import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloEnvironment = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
  headers: {
    'content-type': 'application/json',
    'X-CSRF-Trick': 'canIBuyIt'
  }
});
