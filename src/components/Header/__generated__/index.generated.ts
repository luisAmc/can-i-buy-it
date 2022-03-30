import * as Types from '../../../__generated__/schema.generated';

export type HeaderQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HeaderQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string } | null };
