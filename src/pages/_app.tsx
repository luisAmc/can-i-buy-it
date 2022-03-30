import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'src/apolloEnvironment';
import type { AppProps } from 'next/app';
import '../styles.css';
import { Layout } from 'src/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialClientState);

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
