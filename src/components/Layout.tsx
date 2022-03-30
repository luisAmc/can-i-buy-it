import { ReactNode } from 'react';
import { Header } from './Header';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col space-y-2 min-h-screen'>
      <Header />

      <div className='max-w-7xl w-full mx-auto'>{children}</div>
    </div>
  );
}
