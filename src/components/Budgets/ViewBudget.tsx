import { gql, useQuery } from '@apollo/client';
import {
  ChevronLeftIcon,
  PencilIcon,
  ZoomInIcon
} from '@heroicons/react/outline';
import { CATEGORY, TRANSACTION_TYPE } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { formatCurrency, formatDate } from 'src/utils/transforms';
import { Transaction } from 'src/__generated__/schema.generated';
import { Button } from '../shared/Button';
import { List, ListItem } from '../shared/List';
import { Page } from '../shared/Page';
import { Pill } from '../shared/Pill';
import { Table, TableDataCell, TableHeader, TableRow } from '../shared/Table';
import { getCategoryProps } from '../Transactions/utils/getCategoryProps';
import { TransactionFragment } from '../Transactions/ViewTransaction';
import {
  ViewBudgetQuery,
  ViewBudgetQueryVariables,
  ViewBudgetTransactionsQuery,
  ViewBudgetTransactionsQueryVariables
} from './__generated__/ViewBudget.generated';

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

export function ViewBudget() {
  const router = useRouter();

  const { data, loading, error } = useQuery<
    ViewBudgetQuery,
    ViewBudgetQueryVariables
  >(query, {
    variables: { id: router.query.budgetId as string },
    skip: !router.isReady
  });

  const transactionsQuery = useQuery<
    ViewBudgetTransactionsQuery,
    ViewBudgetTransactionsQueryVariables
  >(
    gql`
      query ViewBudgetTransactionsQuery($input: BudgetTransactionsInput!) {
        budgetTransactions(input: $input) {
          total
          transactions {
            ...Transaction_transaction
          }
        }
      }
      ${TransactionFragment}
    `,
    {
      variables: {
        input: {
          id: router.query.budgetId as string,
          start: '',
          end: ''
        }
      },
      skip: !data?.budget
    }
  );

  const consumedBudget = transactionsQuery.data?.budgetTransactions.total ?? 0;

  const transactions =
    transactionsQuery.data?.budgetTransactions.transactions ?? [];

  return (
    <Page text='Tablero' href='/'>
      <div className='mx-auto max-w-4xl mt-4 relative bg-amber-200 rounded-xl overflow-hidden sm:overflow-visible shadow'>
        <div className='relative pt-8 px-4 md:px-12 pb-6'>
          <div className='flex mb-2'>
            <Link href='/'>
              <div className='flex items-center font-medium px-2 py-1 border border-transparent hover:bg-purple-50 hover:border-purple-100 transition-all cursor-pointer rounded-full'>
                <ChevronLeftIcon className='w-4 h-4 mr-1' />
                <span>Regresar</span>
              </div>
            </Link>
          </div>

          <div className='w-[200px] md:w-[230px] flex flex-col space-y-2'>
            <h1 className='text-3xl md:text-4xl font-medium text-amber-900'>
              {data?.budget.category}
            </h1>
          </div>

          <img
            src='/images/sign.png'
            className='absolute -right-24 sm:right-8 top-0 sm:-top-20 md:-top-28 w-[200px] sm:w-[350px] md:w-[500px] aspect-auto'
          />
        </div>

        <div className='relative'>
          {loading && <div>shimmer</div>}

          {!loading &&
            (transactions.length === 0 ? (
              <div>empty</div>
            ) : (
              <>
                <div className='flex flex-col space-y-4 bg-white border-b rounded-xl pb-5 border'>
                  <div className='hidden sm:block'>
                    <Table
                      values={transactions}
                      header={
                        <>
                          <TableHeader label='#' className='sm:w-5' />
                          <TableHeader label='Fecha' />
                          <TableHeader
                            label='Cantidad'
                            className='text-right'
                          />
                          <TableHeader
                            label=''
                            className='sm:w-6 text-center'
                          />
                        </>
                      }
                    >
                      {(transaction, i) => (
                        <TableRow key={transaction.id}>
                          <TableDataCell>{i + 1}</TableDataCell>
                          <TableDataCell>
                            <div className='text-slate-500 font-semibold'>
                              {formatDate(transaction.date)}
                            </div>
                            <div className='text-base text-slate-600'>
                              {transaction.notes}
                            </div>
                          </TableDataCell>
                          <TableDataCell className='text-right'>
                            {formatCurrency(transaction.amount)}
                          </TableDataCell>
                          <TableDataCell>
                            <Button href={`/transactions/${transaction.id}`}>
                              <ZoomInIcon className='w-4 h-4' />
                            </Button>
                          </TableDataCell>
                        </TableRow>
                      )}
                    </Table>
                  </div>

                  <div className='block sm:hidden'>
                    <List values={transactions}>
                      {(transaction, i) => (
                        <TransactionItem
                          key={transaction.id}
                          data={transaction}
                        />
                      )}
                    </List>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </Page>
  );
}

function TransactionItem({ data }: { data: Transaction }) {
  return (
    <ListItem>
      <a href={`/transactions/${data.id}`} className='block hover:bg-gray-50'>
        <div className='flex items-center justify-between px-4 py-4 sm:px-6'>
          <div className='flex flex-col'>
            <div className='flex space-x-2'>
              <div className='text-sm'>{formatDate(data.date)}</div>

              <Pill
                size='tiny'
                {...getCategoryProps(data.category as CATEGORY)}
              />
            </div>
            <div className='text-ellipsis text-slate-500 text-sm'>
              {data.notes}
            </div>
          </div>
          <div className='text-sm font-semibold text-slate-600'>
            {formatCurrency(data.amount)}
          </div>
        </div>
      </a>
    </ListItem>
  );
}
