import { gql } from '@apollo/client';
import { PlusIcon } from '@heroicons/react/outline';
import { CATEGORY } from '@prisma/client';
import { formatCurrency, formatDate } from 'src/utils/transforms';
import { Button } from '../shared/Button';
import { Container } from '../shared/Container';
import { Link } from '../shared/Link';
import { List, ListItem } from '../shared/List';
import { Pill } from '../shared/Pill';
import { getCategoryProps } from './utils/getCategoryProps';
import { TransactionInfo_Transaction } from './__generated__/TransactionsList.generated';

export const BaseTransactionInfoFragment = gql`
  fragment TransactionInfo_transaction on Transaction {
    id
    category
    amount
    notes
    date
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
              <ListItem key={transaction.id}>
                <Link
                  href={`/transactions/${transaction.id}`}
                  className='block hover:bg-gray-50'
                >
                  <div className='grid grid-cols-4 gap-4 px-4 py-4 md:px-6'>
                    <div>{formatDate(transaction.date)}</div>
                    <div className='text-ellipsis'>{transaction.notes}</div>
                    <div className='text-center'>
                      <Pill
                        {...getCategoryProps(transaction.category as CATEGORY)}
                      />
                    </div>
                    <div className='text-right'>
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                </Link>
              </ListItem>
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
