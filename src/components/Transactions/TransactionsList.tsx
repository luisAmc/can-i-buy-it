import { gql } from '@apollo/client';
import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { Container } from '../shared/Container';
import { List, ListItem } from '../shared/List';
import { TransactionInfo_Transaction } from './__generated__/TransactionsList.generated';

export const TransactionInfoFragment = gql`
  fragment TransactionInfo_transaction on Transaction {
    id
    category
    amount
    notes
  }
`;

interface Props {
  transactions: TransactionInfo_Transaction[];
}

export function TransactionList({ transactions }: Props) {
  return (
    <Container
      title='Últimas 5 transacciones'
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
      <div className='mb-5'>
        {transactions.length > 0 ? (
          <List values={transactions}>
            {(transaction, i) => (
              <TransactionItem key={transaction.id} data={transaction} />
            )}
          </List>
        ) : (
          <div>No hay transactions</div>
        )}
      </div>

      <Link href='/transactions' passHref>
        <a className='mt-4 flex items-center justify-center px-4 py-2 rounded-md transition-all ease-in-out hover:bg-brand-50 hover:opacity-75'>
          <div className='text-brand-900 text-sm font-medium'>
            Ver todas las transacciones
          </div>
        </a>
      </Link>
    </Container>
  );
}

function TransactionItem({ data }: { data: TransactionInfo_Transaction }) {
  return (
    <ListItem>
      <a href={`/transactions/${data.id}`} className='block hover:bg-gray-50'>
        <div className='flex justify-between px-4 py-4 sm:px-6'>
          <div className='text-ellipsis'>{data.notes}</div>
          <div>{data.amount}</div>
        </div>
      </a>
    </ListItem>
  );
}
