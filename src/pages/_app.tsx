import { ApolloProvider } from '@apollo/client';
import { apolloEnvironment } from 'src/apolloEnvironment';
import type { AppProps } from 'next/app';
import '../styles.css';
import { Layout } from 'src/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloEnvironment}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
