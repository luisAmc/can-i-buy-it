import { gql, useQuery } from '@apollo/client';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { CATEGORY } from '@prisma/client';
import { useRouter } from 'next/router';
import {
  formatCurrency,
  formatDate,
  formatDatetime
} from 'src/utils/transforms';
import { Button } from '../shared/Button';
import { Container } from '../shared/Container';
import { Pill } from '../shared/Pill';
import { BaseTransactionInfoFragment } from './TransactionsList';
import { getCategoryProps } from './utils/getCategoryProps';
import {
  ViewTransactionQuery,
  ViewTransactionQueryVariables
} from './__generated__/ViewTransaction.generated';

export const TransactionFragment = gql`
  fragment Transaction_transaction on Transaction {
    id
    date
    type
    updatedAt
    ...TransactionInfo_transaction
  }
  ${BaseTransactionInfoFragment}
`;

export const query = gql`
  query ViewTransactionQuery($id: ID!) {
    transaction(id: $id) {
      id
      ...Transaction_transaction
    }
  }
  ${TransactionFragment}
`;

export function ViewTransaction() {
  const router = useRouter();

  const { data, loading, error } = useQuery<
    ViewTransactionQuery,
    ViewTransactionQueryVariables
  >(query, {
    variables: { id: router.query.transactionId as string },
    skip: !router.isReady
  });

  return (
    <Container
      title='Transacción'
      action={
        <div className='w-full flex flex-col sm:justify-end sm:flex-row items-center gap-2'>
          <Button color='secondary'>
            <PencilIcon className='w-4 h-4 mr-1' />
            <span>Editar</span>
          </Button>
          <Button color='danger'>
            <TrashIcon className='w-4 h-4 mr-1' />
            <span>Elimnar</span>
          </Button>
        </div>
      }
    >
      {data?.transaction && (
        <div className='flex flex-col gap-3 md:w-[462px]'>
          <div className='flex items-center justify-between'>
            <div>{formatDate(data.transaction.date)}</div>
            <Pill
              {...getCategoryProps(data.transaction.category as CATEGORY)}
            />
          </div>

          <div className='text-5xl text-center text-gray-800 w-full px-4 py-8 '>
            {formatCurrency(data.transaction.amount)}
          </div>

          {data.transaction.notes && (
            <div className='bg-brand-50 p-4 rounded-lg'>
              {data.transaction.notes}
            </div>
          )}

          <div className='flex items-center justify-end text-sm text-slate-400'>
            {formatDatetime(data.transaction.updatedAt)}
          </div>
        </div>
      )}

      <div className='flex justify-center mt-8'>
        <img src='/images/checking.png' className='h-52 aspect-auto' />
      </div>
    </Container>
  );
}
