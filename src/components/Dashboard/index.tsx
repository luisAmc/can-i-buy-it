import { gql, useQuery } from '@apollo/client';
import { BudgetCards } from '../Budgets/BudgetCards';
import { BudgetInfoFragment, BudgetList } from '../Budgets/BudgetList';
import { Page } from '../shared/Page';
import {
  BaseTransactionInfoFragment,
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
    ${BaseTransactionInfoFragment}
  `);

  const transactions = data?.me?.transactions ?? [];
  const budgets = data?.me?.budgets ?? [];

  return (
    <Page>
      <div className='mb-4 hidden sm:block'>
        <BudgetCards budgets={budgets} />
      </div>

      <div className='block sm:hidden'>
        <BudgetList budgets={budgets} />
      </div>
      
      <TransactionList transactions={transactions} />
    </Page>
  );
}
