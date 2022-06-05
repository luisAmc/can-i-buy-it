import { GetServerSideProps } from 'next';
import { preloadQuery, SessionProps } from 'src/apolloEnvironment';
import { query } from 'src/components/Transactions';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await authenticatedRoute(ctx);
  if ('redirect' in auth) {
    return auth;
  }

  const sessionProps = auth as SessionProps;

  return preloadQuery(sessionProps, ctx, { query });
};

export { Transactions as default } from 'src/components/Transactions';
