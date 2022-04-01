import { GetServerSideProps } from 'next';
import { preloadQuery } from 'src/apolloEnvironment';
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

  return preloadQuery(ctx, {
    query,
    variables: { id: ctx.params!.transactionId }
  });
};

export { ViewTransaction as default } from 'src/components/Transactions/ViewTransaction';
