import { GetServerSideProps } from 'next';
import { preloadQuery } from 'src/apolloEnvironment';
import { query } from 'src/components/Budgets/ViewBudget';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps<
  {},
  { budgetId: string }
> = async (ctx) => {
  const auth = await authenticatedRoute(ctx);
  if ('redirect' in auth) {
    return auth;
  }

  return preloadQuery(ctx, {
    query,
    variables: { id: ctx.params!.budgetId }
  });
};

export { UpdateBudget as default } from 'src/components/Budgets/UpdateBudget';
