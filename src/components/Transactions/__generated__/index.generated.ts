import * as Types from '../../../__generated__/schema.generated';

export type TransactionsQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type TransactionsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, transactionsCount: number, transactions: Array<{ __typename?: 'Transaction', id: string, date: string, type: string, updatedAt: string, category: string, amount: number, notes?: string | null }> } | null };
