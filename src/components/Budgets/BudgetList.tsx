import { gql } from '@apollo/client';
import { CATEGORY } from '@prisma/client';
import clsx from 'clsx';
import { Container } from '../shared/Container';
import { Link } from '../shared/Link';
import { List, ListItem } from '../shared/List';
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
    <Container title='Budgets' size='full'>
      {budgets.length > 0 ? (
        <List values={budgets}>
          {(budget) => (
            <ListItem key={budget.id}>
              <Link
                href={`/budgets/${budget.id}`}
                className='block hover:bg-gray-50'
              >
                <div className='flex items-center justify-between px-4 py-4 sm:px-6'>
                  <div className='flex items-center gap-2'>
                    <div
                      className={clsx('w-4 h-4 rounded-full', {
                        'bg-category-entertainment-300':
                          budget.category === CATEGORY.ENTERTAINMENT,
                        'bg-category-home-300':
                          budget.category === CATEGORY.HOME,
                        'bg-category-car-300': budget.category === CATEGORY.CAR,
                        'bg-category-service-300':
                          budget.category === CATEGORY.SERVICE,
                        'bg-category-food-300':
                          budget.category === CATEGORY.FOOD,
                        'bg-gray-300': budget.category === CATEGORY.OTHER
                      })}
                    ></div>
                    <div>{budget.category}</div>
                  </div>

                  <div>
                    <div className='flex items-center space-x-1'>
                      <span>0</span>
                      <span>/</span>
                      <span>{budget.limit}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </ListItem>
          )}
        </List>
      ) : (
        <div>No hay budgets</div>
      )}
    </Container>
  );
}
