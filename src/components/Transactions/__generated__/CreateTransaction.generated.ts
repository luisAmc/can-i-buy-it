import * as Types from '../../../__generated__/schema.generated';

export type CreateTransactionMutationVariables = Types.Exact<{
  input: Types.CreateTransactionInput;
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', createTransaction: { __typename?: 'Transaction', id: string } };
