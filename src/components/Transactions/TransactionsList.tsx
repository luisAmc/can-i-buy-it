import { gql } from '@apollo/client';
import { PlusIcon } from '@heroicons/react/outline';
import { Button } from '../shared/Button';
import { Container } from '../shared/Container';
import { Link } from '../shared/Link';
import { List, ListItem } from '../shared/List';
import { TransactionInfo_Transaction } from './__generated__/TransactionsList.generated';

export const BaseTransactionInfoFragment = gql`
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
        <Button href='/transactions/create'>
          <PlusIcon className='w-4 h-4 mr-1' />
          <span>Añadir</span>
        </Button>
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

      <Link
        href='/transactions'
        className='mt-4 flex items-center justify-center px-4 py-2 rounded-md transition-all ease-in-out hover:bg-brand-50 hover:opacity-75'
      >
        <div className='text-brand-900 text-sm font-medium'>
          Ver todas las transacciones
        </div>
      </Link>
    </Container>
  );
}

function TransactionItem({ data }: { data: TransactionInfo_Transaction }) {
  return (
    <ListItem>
      <Link
        href={`/transactions/${data.id}`}
        className='block hover:bg-gray-50'
      >
        <div className='flex justify-between px-4 py-4 sm:px-6'>
          <div className='text-ellipsis'>{data.notes}</div>
          <div>{data.amount}</div>
        </div>
      </Link>
    </ListItem>
  );
}
