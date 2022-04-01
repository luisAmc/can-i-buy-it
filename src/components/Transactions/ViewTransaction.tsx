import { gql, useQuery } from '@apollo/client';
import { CATEGORY } from '@prisma/client';
import { useRouter } from 'next/router';
import {
  formatCurrency,
  formatDate,
  formatDatetime
} from 'src/utils/transforms';
import { categoryProps } from '.';
import { Container } from '../shared/Container';
import { Pill } from '../shared/Pill';
import { BaseTransactionInfoFragment } from './TransactionsList';
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
    <Container title='Transacción'>
      {data?.transaction && (
        <div className='flex flex-col gap-3 md:w-[462px]'>
          <div className='flex items-center justify-between'>
            <div>{formatDate(data.transaction.date)}</div>
            <Pill label={data.transaction.category} color='purple' />
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
