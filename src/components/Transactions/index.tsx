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
  >(query, { variables: { limit: 5 } });

  const transactions = data?.me?.transactions ?? [];

  return (
    <div className='mt-4 relative bg-violet-200 rounded-xl overflow-hidden sm:overflow-visible shadow'>
      <div className='relative pt-12 px-4 md:px-12 pb-6'>
        <div className='w-[200px] md:w-[230px] flex flex-col space-y-2'>
          <h1 className='text-3xl md:text-4xl font-medium text-violet-900'>
            Transacciones
          </h1>

          <Link href='/transactions/create' passHref>
            <a
              href='/'
              className='bg-brand-100 text-center rounded-full py-3 px-4 text-brand-500 font-semibold shadow-md hover:opacity-75'
            >
              <div className='flex flex-row items-center justify-center'>
                <PlusIcon className='w-4 h-4 mr-1' />
                <span>Añadir una más</span>
              </div>
            </a>
          </Link>
        </div>

        <img
          src='/images/sign.png'
          className='absolute -right-24 sm:right-8 top-0 sm:-top-20 md:-top-28 w-[200px] sm:w-[350px] md:w-[500px] aspect-auto'
        />
      </div>
      <div className='relative'>
        {loading && <Shimmer />}

        {!loading &&
          (transactions.length === 0 ? (
            <Empty />
          ) : (
            <div className='flex flex-col space-y-4 bg-white border-b rounded-xl pb-5 border'>
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

              {!loading &&
                data?.me?.transactions &&
                data.me.transactionsCount > data.me.transactions.length && (
                  <div className='flex flex-col justify-center px-4'>
                    <button
                      className='mt-4 flex items-center justify-center px-4 py-2 rounded-md transition-all ease-in-out hover:bg-brand-50 hover:opacity-75'
                      onClick={() =>
                        fetchMore({
                          variables: { offset: data.me?.transactions.length }
                        })
                      }
                    >
                      <div className='text-brand-900 text-sm font-medium'>
                        Ver más
                      </div>
                    </button>
                  </div>
                )}
            </div>
          ))}
      </div>
    </div>
  );
}

function Shimmer() {
  return (
    <div className='bg-white'>
      <div className='animate-pulse flex flex-col gap-4 p-4'>
        <div className='flex flex-row gap-5'>
          <div className='h-6 w-5 bg-gray-300 rounded-md'></div>
          <div className='h-6 w-5/12 bg-gray-300 rounded-md'></div>
          <div className='h-6 w-2/12 bg-gray-300 rounded-md'></div>
          <div className='h-6 w-2/12 bg-gray-300 rounded-md'></div>
          <div className='h-6 w-2/12 bg-gray-300 rounded-md'></div>
        </div>

        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`shimmer-row-${i}`} className='flex flex-row gap-5'>
            <div className='h-6 w-5 bg-gray-200 rounded-md'></div>
            <div className='h-6 w-5/12 bg-gray-200 rounded-md'></div>
            <div className='h-6 w-2/12 bg-gray-200 rounded-full'></div>
            <div className='h-6 w-2/12 bg-gray-200 rounded-full'></div>
            <div className='h-6 w-2/12 bg-gray-200 rounded-md'></div>
          </div>
        ))}

        <div className='flex flex-row justify-center space-x-2'>
          <div className='h-6 w-7 bg-gray-200 rounded-md'></div>
          <div className='h-6 w-3 bg-gray-200 rounded-md'></div>
          <div className='h-6 w-7 bg-gray-200 rounded-md'></div>
        </div>
      </div>
    </div>
  );
}

function Empty() {
  return (
    <div className='bg-white rounded-b-xl'>
      <div className='flex flex-col gap-8 items-center justify-center py-12 px-4'>
        <img src='/images/searching.png' className='h-[250px] md:h-[350px]' />

        <Link href='/transactions/create' passHref>
          <a className='border-2 border-dashed border-gray-200 rounded-md p-6 hover:bg-gray-50 hover:border-gray-300'>
            <div className='flex flex-col justify-center items-center'>
              <PlusIcon className='w-8 h-8 text-slate-500 mb-2' />
              <p className='text-center font-bold text-slate-700'>
                No se hay nada por aquí todavía
              </p>
              <p className='text-center text-sm text-slate-500'>
                Presiona aquí para crear una transacción
              </p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
