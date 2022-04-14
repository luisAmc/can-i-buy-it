import { gql } from '@apollo/client';
import { PencilIcon } from '@heroicons/react/outline';
import { CATEGORY } from '@prisma/client';
import clsx from 'clsx';
import { Button } from '../shared/Button';
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
    <Container
      title='Budgets'
      size='full'
      action={<Button href='/budgets/update'>Actualizar limites</Button>}
    >
      {budgets.length > 0 ? (
        <div className='flex flex-col gap-2'>
          {budgets.map((budget) => (
            <div
              className={clsx(
                'flex items-center justify-between py-2 px-4 rounded-lg'
              )}
            >
              <div className='flex items-center gap-1'>
                <div
                  className={clsx('w-4 h-4 rounded-full', {
                    'bg-category-entertainment-300':
                      budget.category === CATEGORY.ENTERTAINMENT,
                    'bg-category-home-300': budget.category === CATEGORY.HOME,
                    'bg-category-car-300': budget.category === CATEGORY.CAR,
                    'bg-category-service-300':
                      budget.category === CATEGORY.SERVICE,
                    'bg-category-food-300': budget.category === CATEGORY.FOOD,
                    'bg-gray-300': budget.category === CATEGORY.OTHER
                  })}
                ></div>
                <div>{budget.category}</div>
              </div>
              <div>
                <div className='font-semibold tracking-wider flex items-center space-x-1'>
                  <span>0</span>
                  <span>/</span>
                  <span>{budget.limit}</span>
                </div>
                <Button href={`/budgets/${budget.id}`}>
                  <PencilIcon className='w-4 h-4' />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No hay budgets</div>
      )}
    </Container>
  );
}
