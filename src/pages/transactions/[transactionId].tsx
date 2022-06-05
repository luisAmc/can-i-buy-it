import { GetServerSideProps } from 'next';
import { preloadQuery, SessionProps } from 'src/apolloEnvironment';
import { query } from 'src/components/Transactions/ViewTransaction';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps<
  {},
  { transactionId: string }
> = async (ctx) => {
  const auth = await authenticatedRoute(ctx);
  if ('redirect' in auth) {
    return auth;
  }

  const sessionProps = auth as SessionProps;

  return preloadQuery(sessionProps, ctx, {
    query,
    variables: { id: ctx.params!.transactionId }
  });
};

export { ViewTransaction as default } from 'src/components/Transactions/ViewTransaction';
