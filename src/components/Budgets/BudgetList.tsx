import { gql } from '@apollo/client';
import { CATEGORY } from '@prisma/client';
import clsx from 'clsx';
import { formatPercentage } from 'src/utils/transforms';
import { Container } from '../shared/Container';
import { Link } from '../shared/Link';
import { List, ListItem } from '../shared/List';
import { useBudgetColors } from './utils/useBudgetColors';
import { BudgetFragment } from './ViewBudget';
import { BudgetInfo_Budget } from './__generated__/BudgetList.generated';

export const BudgetInfoFragment = gql`
  fragment BudgetInfo_budget on Budget {
    id
    ...Budget_budget
    consumed
  }
  ${BudgetFragment}
`;

interface Props {
  budgets: BudgetInfo_Budget[];
}

export function BudgetList({ budgets }: Props) {
  return (
    <Container title='Budgets' size='full'>
      {budgets.length > 0 ? (
        <List values={budgets} className='rounded-lg overflow-hidden'>
          {(budget) => (
            <ListItem key={budget.id}>
              <Link
                href={`/budgets/${budget.id}`}
                className='relative hover:opacity-60'
              >
                <div
                  className={clsx(
                    'absolute w-full h-full',
                    useBudgetColors(budget.category as CATEGORY)
                  )}
                ></div>

                <div
                  className={clsx('absolute h-full', {
                    'bg-category-entertainment-300':
                      budget.category === CATEGORY.ENTERTAINMENT,
                    'bg-category-home-300': budget.category === CATEGORY.HOME,
                    'bg-category-car-300': budget.category === CATEGORY.CAR,
                    'bg-category-service-300':
                      budget.category === CATEGORY.SERVICE,
                    'bg-category-food-300': budget.category === CATEGORY.FOOD,
                    'bg-gray-300': budget.category === CATEGORY.OTHER
                  })}
                  style={{
                    width: (budget.consumed / (budget.limit || 1)) * 100 + '%'
                  }}
                ></div>

                <div className='relative flex items-center justify-between px-4 py-4 sm:px-6'>
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
                    <div className='flex items-end'>
                      {formatPercentage(budget.consumed / (budget.limit || 1))}
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
