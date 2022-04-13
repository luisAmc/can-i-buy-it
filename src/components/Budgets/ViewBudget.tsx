import { gql } from '@apollo/client';

export const BudgetFragment = gql`
  fragment Budget_budget on Budget {
    id
    limit
    category
    updatedAt
  }
`;

export const query = gql`
  query ViewBudgetQuery($id: ID!) {
    budget(id: $id) {
      id
      ...Budget_budget
    }
  }
  ${BudgetFragment}
`;
