import { BudgetFragment } from './ViewBudget';
import { BudgetInfo_Budget } from './__generated__/BudgetList.generated';
import { CATEGORY } from '@prisma/client';
import { formatPercentage } from 'src/utils/transforms';
import { gql } from '@apollo/client';
import { Link } from '../shared/Link';
import clsx from 'clsx';
import { useBudgetColors } from './utils/useBudgetColors';

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

export function BudgetCards({ budgets }: Props) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
      {budgets.map((budget) => (
        <BudgetCard key={budget.id} budget={budget} />
      ))}
    </div>
  );
}

interface BudgetCardProps {
  budget: BudgetInfo_Budget;
}

function BudgetCard({ budget }: BudgetCardProps) {
  return (
    <Link
      href={`/budgets/${budget.id}`}
      className={clsx(
        'relative rounded-lg shadow border w-full aspect-[16/9] lg:aspect-square overflow-hidden hover:shadow-md hover:opacity-75 transition ease-in-out',
        useBudgetColors(budget.category as CATEGORY)
      )}
    >
      <div
        className={clsx('w-full absolute bottom-0', {
          'bg-category-entertainment-300':
            budget.category === CATEGORY.ENTERTAINMENT,
          'bg-category-home-300': budget.category === CATEGORY.HOME,
          'bg-category-car-300': budget.category === CATEGORY.CAR,
          'bg-category-service-300': budget.category === CATEGORY.SERVICE,
          'bg-category-food-300': budget.category === CATEGORY.FOOD,
          'bg-gray-300': budget.category === CATEGORY.OTHER
        })}
        style={{
          height: (budget.consumed / (budget.limit || 1)) * 100 + '%'
        }}
      ></div>

      <div className='relative h-full flex flex-col items-center p-4'>
        <dd className='flex-1 flex items-center justify-center'>
          <span className='text-3xl font-medium text-gray-600'>
            {formatPercentage(budget.consumed / (budget.limit || 1))}
          </span>
        </dd>

        <dt className='text-sm font-medium'>{budget.category}</dt>
      </div>
    </Link>
  );
}
