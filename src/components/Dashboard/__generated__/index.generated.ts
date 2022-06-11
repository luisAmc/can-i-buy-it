import * as Types from '../../../__generated__/schema.generated';

export type DashboardQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DashboardQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, budgets: Array<{ __typename?: 'Budget', id: string, consumed: number, limit: number, category: string, updatedAt: string }>, transactions: Array<{ __typename?: 'Transaction', id: string, category: string, amount: number, notes?: string | null, date: string }> } | null };
