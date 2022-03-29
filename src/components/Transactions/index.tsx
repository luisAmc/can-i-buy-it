import { gql, useQuery } from '@apollo/client';
import { Container } from '../shared/Container';
import {
  TransactionsQuery,
  TransactionsQueryVariables
} from './__generated__/index.generated';

export const query = gql`
  query TransactionsQuery($offset: Int, $limit: Int) {
    me {
      transactionsCount
      transactions(offset: $offset, limit: $limit) {
        id
        amount
        date
        notes
        type
        category
      }
    }
  }
`;

export function Transactions() {
  const { data, loading, error, fetchMore } = useQuery<
    TransactionsQuery,
    TransactionsQueryVariables
  >(query, { variables: { limit: 10 } });

  const transactions = data?.me?.transactions ?? [];

  return (
    <Container title='Transacciones'>
      {loading && <Shimmer />}

      {transactions.length === 0 ? (
        <Empty />
      ) : (
        <div className='flex flex-col space-y-2 divide-y'>
          {transactions.map((transaction) => (
            <div key={transaction.id}>
              <div>{transaction.category}</div>
              <div>{transaction.type}</div>
              <div>{transaction.amount}</div>
              <div>{transaction.date}</div>
              <div>{transaction.notes}</div>
            </div>
          ))}
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
