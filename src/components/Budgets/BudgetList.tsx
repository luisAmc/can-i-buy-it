import { gql } from '@apollo/client';
import { Container } from '../shared/Container';
import { BudgetInfo_Budget } from './__generated__/BudgetList.generated';

export const BudgetInfoFragment = gql`
  fragment BudgetInfo_budget on Budget {
    id
    limit
    category
  }
`;

interface Props {
  budgets: BudgetInfo_Budget[];
}

export function BudgetList({ budgets }: Props) {
  return (
    <Container title='Budget' size='full'>
      {budgets.length > 0 ? (
        <div>
          {budgets.map((budget) => (
            <div>{budget.id}</div>
          ))}
        </div>
      ) : (
        <div>No hay budgets</div>
      )}
    </Container>
  );
}
