import * as Types from '../../../__generated__/schema.generated';

export type SignupFormMutationVariables = Types.Exact<{
  input: Types.SignupInput;
}>;


export type SignupFormMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', id: string } };
