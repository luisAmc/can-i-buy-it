import { gql, useQuery } from '@apollo/client';
import { BudgetInfoFragment, BudgetList } from '../Budgets/BudgetList';
import {
  TransactionInfoFragment,
  TransactionList
} from '../Transactions/TransactionsList';
import {
  DashboardQuery,
  DashboardQueryVariables
} from './__generated__/index.generated';

export function Dashboard() {
  const { data } = useQuery<DashboardQuery, DashboardQueryVariables>(gql`
    query DashboardQuery {
      me {
        id
        budgets {
          ...BudgetInfo_budget
        }
        transactions {
          ...TransactionInfo_transaction
        }
      }
    }
    ${BudgetInfoFragment}
    ${TransactionInfoFragment}
  `);

  const transactions = data?.me?.transactions ?? [];
  const budgets = data?.me?.budgets ?? [];

  return (
    <div className='grid md:grid-cols-2 gap-4'>
      <TransactionList transactions={transactions} />
      <BudgetList budgets={budgets} />
    </div>
  );
}
