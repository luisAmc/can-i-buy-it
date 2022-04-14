import * as Types from '../../../__generated__/schema.generated';

export type Budget_Budget = { __typename?: 'Budget', id: string, limit: number, category: string, updatedAt: string };

export type ViewBudgetQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type ViewBudgetQuery = { __typename?: 'Query', budget: { __typename?: 'Budget', id: string, limit: number, category: string, updatedAt: string } };

export type ViewBudgetTransactionsQueryVariables = Types.Exact<{
  input: Types.BudgetTransactionsInput;
}>;


export type ViewBudgetTransactionsQuery = { __typename?: 'Query', budgetTransactions: { __typename?: 'BudgetTransactions', total: number, transactions: Array<{ __typename?: 'Transaction', id: string, date: string, type: string, updatedAt: string, category: string, amount: number, notes?: string | null }> } };
