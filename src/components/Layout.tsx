import { gql, useQuery } from '@apollo/client';
import { ReactNode } from 'react';
import { Header } from './Header';
import { MeQuery } from './Home/__generated__/index.generated';

const LayoutQuery = gql`
  query MeQuery {
    me {
      username
    }
  }
`;

export function Layout({ children }: { children: ReactNode }) {
  const { data } = useQuery<MeQuery>(LayoutQuery);

  return (
    <div className='flex flex-col space-y-2 min-h-screen'>
      <Header me={data?.me} />

      <div className='max-w-7xl w-full mx-auto'>{children}</div>
    </div>
  );
}
