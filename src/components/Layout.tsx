import { ReactNode } from 'react';
import { Header } from './Header';

interface Props {
  me?: {
    username: string;
  };
  children: ReactNode;
}

export function Layout({ me, children }: Props) {
  if (!me) return <>{children}</>;

  return (
    <div className='flex flex-col space-y-2 min-h-screen'>
      <Header me={me} />

      <div className='max-w-7xl w-full mx-auto'>{children}</div>
    </div>
  );
}
