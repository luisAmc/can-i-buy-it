import { gql, useQuery } from '@apollo/client';
import { PencilIcon, ZoomInIcon } from '@heroicons/react/outline';
import { CATEGORY, TRANSACTION_TYPE } from '@prisma/client';
import { useRouter } from 'next/router';
import { formatCurrency, formatDate } from 'src/utils/transforms';
import { Button } from '../shared/Button';
import { Link } from '../shared/Link';
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
    <div className='mt-4 bg-amber-200 rounded-xl overflow-hidden sm:overflow-visible shadow'>
      {loading && <div>shimmer</div>}

      {error && <div>{error}</div>}

      {!loading && data?.budget && (
        <div>
          <div className='pt-12 px-4 md:px-12 pb-6'>
            <div className='flex items-center justify-between'>
              <div className='text-amber-900 flex items-center space-x-6'>
                <span className='text-3xl md:text-4xl font-medium'>
                  {data.budget.category}
                </span>

                <span className='text-3xl'>&middot;</span>

                {data.budget.limit > 0 ? (
                  <span className='text-xl flex items-center space-x-1'>
                    <span>{consumedBudget}</span>
                    <span>/</span>
                    <span>{data.budget.limit}</span>

                    {data.budget.limit > 0 && (
                      <span className='text-sm'>
                        ({(consumedBudget / data.budget.limit) * 100} %)
                      </span>
                    )}
                  </span>
                ) : (
                  <span className='text-sm font-bold'>Sin límite</span>
                )}
              </div>

              <div>
                <Button href={`/budgets/${data.budget.id}/update`}>
                  <PencilIcon className='w-4 h-4 mr-1' />
                  <span>Editar</span>
                </Button>
              </div>
            </div>
          </div>
          <div className='flex flex-col space-y-4 bg-white border-b rounded-xl pb-5'>
            <div className='hidden sm:block rounded-xl overflow-hidden'>
              <Table
                values={transactions}
                header={
                  <>
                    <TableHeader label='#' className='sm:w-5' />
                    <TableHeader label='Fecha' />
                    <TableHeader label='Tipo' className='text-center' />
                    <TableHeader label='Categoría' className='text-center' />
                    <TableHeader label='Cantidad' className='text-right' />
                    <TableHeader label='' className='sm:w-6 text-center' />
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
                    <TableDataCell className='text-center'>
                      <Pill
                        color={
                          transaction.type === TRANSACTION_TYPE.INCOME
                            ? 'teal'
                            : 'blue'
                        }
                        label={
                          transaction.type === TRANSACTION_TYPE.INCOME
                            ? 'Ingreso'
                            : 'Egreso'
                        }
                      />
                    </TableDataCell>
                    <TableDataCell className='text-center'>
                      <Pill
                        {...getCategoryProps(transaction.category as CATEGORY)}
                      />
                    </TableDataCell>
                    <TableDataCell className='text-right font-semibold text-slate-600'>
                      {formatCurrency(transaction.amount)}
                    </TableDataCell>

                    <TableDataCell className='text-center'>
                      <Link href={`/transactions/${transaction.id}`}>
                        <a className='w-6 h-6 flex items-center justify-center rounded-full hover:bg-brand-100 text-brand-800'>
                          <ZoomInIcon className='w-4 h-4' />
                        </a>
                      </Link>
                    </TableDataCell>
                  </TableRow>
                )}
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
    // <Container
    //   title='Presupuesto'
    //   action={
    //     data?.budget && (
    //       <Button color='secondary'>
    //         <PencilIcon className='w-4 h-4 mr-1' />
    //         <span>Editar</span>
    //       </Button>
    //     )
    //   }
    // >
    //   {loading && <div>Cargando...</div>}

    //   {data?.budget && <div>{JSON.stringify(data.budget)}</div>}
    // </Container>
  );
}
