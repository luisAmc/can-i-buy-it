import * as Types from '../../../__generated__/schema.generated';

export type UpdateBudgetMutationVariables = Types.Exact<{
  input: Types.UpdateBudgetInput;
}>;


export type UpdateBudgetMutation = { __typename?: 'Mutation', updateBudget: { __typename?: 'Budget', id: string, limit: number, category: string, updatedAt: string } };
