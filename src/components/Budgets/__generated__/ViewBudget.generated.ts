import * as Types from '../../../__generated__/schema.generated';

export type Budget_Budget = { __typename?: 'Budget', id: string, limit: number, category: string, updatedAt: string };

export type ViewBudgetQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type ViewBudgetQuery = { __typename?: 'Query', budget: { __typename?: 'Budget', id: string, limit: number, category: string, updatedAt: string } };
