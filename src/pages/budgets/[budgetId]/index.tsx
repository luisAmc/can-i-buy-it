import { GetServerSideProps } from 'next';
import { preloadQuery, SessionProps } from 'src/apolloEnvironment';
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

  const budgetId = ctx.params!.budgetId;

  const sessionProps = auth as SessionProps;

  return preloadQuery(sessionProps, ctx, {
    query,
    variables: { id: budgetId }
  });
};

export { ViewBudget as default } from 'src/components/Budgets/ViewBudget';
