import { Container } from '../shared/Container';
import { gql, useQuery } from '@apollo/client';
import { PlusIcon } from '@heroicons/react/outline';
import { Table, TableDataCell, TableHeader, TableRow } from '../shared/Table';
import { TransactionInfoFragment } from './TransactionsList';
import Link from 'next/link';
import {
  TransactionsQuery,
  TransactionsQueryVariables
} from './__generated__/index.generated';

export const query = gql`
  query TransactionsQuery($offset: Int, $limit: Int) {
    me {
      id
      transactionsCount
      transactions(offset: $offset, limit: $limit) {
        id
        date
        type
        ...TransactionInfo_transaction
      }
    }
  }
  ${TransactionInfoFragment}
`;

export function Transactions() {
  const { data, loading, error, fetchMore } = useQuery<
    TransactionsQuery,
    TransactionsQueryVariables
  >(query, { variables: { limit: 10 } });

  const transactions = data?.me?.transactions ?? [];

  return (
    <Container
      title='Historial de transacciones'
      size='full'
      action={
        <Link href='/transactions/create' passHref>
          <a className='flex items-center justify-center px-4 py-2 rounded-md bg-brand-50 hover:opacity-75'>
            <div className='text-sm flex items-center text-brand-900 font-medium'>
              <PlusIcon className='w-4 h-4 mr-1' />
              <span>Añadir</span>
            </div>
          </a>
        </Link>
      }
    >
      {loading && <Shimmer />}

      {transactions.length === 0 ? (
        <Empty />
      ) : (
        <div className='flex flex-col space-y-2'>
          <Table
            values={transactions}
            header={
              <>
                <TableHeader label='#' className='sm:w-5' />
                <TableHeader label='Fecha' />
                <TableHeader label='Tipo' />
                <TableHeader label='Categoría' />
                <TableHeader label='Cantidad' className='text-right' />
              </>
            }
          >
            {(transaction, i) => (
              <TableRow key={transaction.id}>
                <TableDataCell>{i + 1}</TableDataCell>
                <TableDataCell>
                  <div className='text-slate-500 font-semibold'>
                    {transaction.date}
                  </div>
                  <div className='text-base text-slate-600'>
                    {transaction.notes}
                  </div>
                </TableDataCell>
                <TableDataCell>{transaction.type}</TableDataCell>
                <TableDataCell>{transaction.category}</TableDataCell>
                <TableDataCell className='text-right font-semibold'>
                  {transaction.amount}
                </TableDataCell>
              </TableRow>
            )}
          </Table>

          <div className='text-center text-sm text-slate-400 space-x-1'>
            <span>{data?.me?.transactions.length}</span>
            <span>de</span>
            <span>{data?.me?.transactionsCount}</span>
          </div>
        </div>
      )}

      {!loading &&
        data?.me?.transactions &&
        data.me.transactionsCount > data.me.transactions.length && (
          <div className='flex justify-center'>
            <button
              onClick={() =>
                fetchMore({
                  variables: { offset: data.me?.transactions.length }
                })
              }
            >
              Ver más
            </button>
          </div>
        )}
    </Container>
  );
}

function Shimmer() {
  return <div className='h-6 w-full bg-gray-300'></div>;
}

function Empty() {
  return <div>No hay :(</div>;
}
