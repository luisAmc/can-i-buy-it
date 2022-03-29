import * as Types from '../../../__generated__/schema.generated';

export type TransactionsQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type TransactionsQuery = { __typename?: 'Query', me?: { __typename?: 'User', transactionsCount: number, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, date: string, notes?: string | null, type: string, category: string }> } | null };
