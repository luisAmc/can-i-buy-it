import { gql } from '@apollo/client';
import { Container } from '../shared/Container';
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
    <Container title='Transacciones' size='full'>
      {transactions.length > 0 ? (
        <div>
          {transactions.map((transaction) => (
            <div>{transaction.id}</div>
          ))}
        </div>
      ) : (
        <div>No hay transactions</div>
      )}
    </Container>
  );
}
