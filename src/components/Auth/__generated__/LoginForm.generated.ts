import * as Types from '../../../__generated__/schema.generated';

export type LoginFormVariables = Types.Exact<{
  input: Types.LoginInput;
}>;


export type LoginForm = { __typename?: 'Mutation', login: { __typename?: 'User', id: string } };
