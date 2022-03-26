import { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return <div className='w-full mx-auto min-h-screen'>{children}</div>;
}
