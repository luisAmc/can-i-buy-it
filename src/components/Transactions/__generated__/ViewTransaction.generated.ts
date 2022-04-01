import * as Types from '../../../__generated__/schema.generated';

export type Transaction_Transaction = { __typename?: 'Transaction', id: string, date: string, type: string, updatedAt: string, category: string, amount: number, notes?: string | null };

export type ViewTransactionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type ViewTransactionQuery = { __typename?: 'Query', transaction: { __typename?: 'Transaction', id: string, date: string, type: string, updatedAt: string, category: string, amount: number, notes?: string | null } };
