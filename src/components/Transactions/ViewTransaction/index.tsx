import { gql, Reference, useMutation, useQuery } from '@apollo/client';
import {
  ExclamationCircleIcon,
  PencilIcon,
  TrashIcon,
  XIcon
} from '@heroicons/react/outline';
import { CATEGORY } from '@prisma/client';
import { useRouter } from 'next/router';
import { Button } from 'src/components/shared/Button';
import { Container } from 'src/components/shared/Container';
import { Modal, useModal } from 'src/components/shared/Modal';
import { Pill } from 'src/components/shared/Pill';
import {
  formatCurrency,
  formatDate,
  formatDatetime
} from 'src/utils/transforms';
import { BaseTransactionInfoFragment } from '../TransactionsList';
import { getCategoryProps } from '../utils/getCategoryProps';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import {
  ViewTransactionDeleteMutation,
  ViewTransactionDeleteMutationVariables,
  ViewTransactionQuery,
  ViewTransactionQueryVariables
} from './__generated__/index.generated';

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

  const confirmationModal = useModal();

  // TODO: Add loading and error states

  const { data, loading, error } = useQuery<
    ViewTransactionQuery,
    ViewTransactionQueryVariables
  >(query, {
    variables: { id: router.query.transactionId as string },
    skip: !router.isReady
  });

  // TODO: Add handling when the delete mutation fails

  const [deleteTransaction, deleteTransactionResult] = useMutation<
    ViewTransactionDeleteMutation,
    ViewTransactionDeleteMutationVariables
  >(
    gql`
      mutation ViewTransactionDeleteMutation($input: DeleteTransactionInput!) {
        deleteTransaction(input: $input) {
          id
        }
      }
    `,
    {
      update(cache) {
        cache.modify({
          fields: {
            transactions(existingTransactions, { readField }) {
              return existingTransactions.filter(
                (transactionRef: Reference) =>
                  data!.transaction.id !== readField('id', transactionRef)
              );
            }
          }
        });
      },
      onCompleted() {
        router.push('/transactions');
      }
    }
  );

  return (
    <Container
      title='Transacción'
      action={
        data?.transaction && (
          <div className='w-full sm:w-auto flex flex-col sm:justify-end sm:flex-row items-center gap-2'>
            <Button
              color='secondary'
              href={`/transactions/${data?.transaction.id}/edit`}
            >
              <PencilIcon className='w-4 h-4 mr-1 sm:mr-0' />
              <span className='block sm:hidden'>Editar</span>
            </Button>

            <Button color='danger' onClick={confirmationModal.open}>
              <TrashIcon className='w-4 h-4 mr-1 sm:mr-0' />
              <span className='block sm:hidden'>Borrar</span>
            </Button>
          </div>
        )
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
            <div className='whitespace-pre-line bg-brand-50 p-4 rounded-lg'>
              {data.transaction.notes}
            </div>
          )}

          <div className='flex items-center justify-end text-sm text-slate-400'>
            {formatDatetime(data.transaction.updatedAt)}
          </div>

          <ConfirmDeleteModal
            {...confirmationModal.props}
            onConfirm={() =>
              deleteTransaction({
                variables: { input: { id: data.transaction.id } }
              })
            }
          />
        </div>
      )}

      <div className='flex justify-center mt-8'>
        {/* eslint-disable-next-line */}
        <img src='/images/checking.png' className='h-52 aspect-auto' alt='' />
      </div>
    </Container>
  );
}
