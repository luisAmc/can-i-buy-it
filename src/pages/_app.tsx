import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'src/apolloEnvironment';
import { Layout } from 'src/components/Layout';
import type { AppProps } from 'next/app';
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialClientState);

  return (
    <ApolloProvider client={client}>
      <Layout me={pageProps.me}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
