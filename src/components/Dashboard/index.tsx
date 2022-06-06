import { gql, useQuery } from '@apollo/client';
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
      <div className='grid lg:grid-cols-2 gap-4'>
        <BudgetList budgets={budgets} />
        <TransactionList transactions={transactions} />
      </div>
    </Page>
  );
}
