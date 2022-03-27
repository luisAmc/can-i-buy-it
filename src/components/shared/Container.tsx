import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  title?: string;
  children: ReactNode;
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
}

export function Container({ title, size = 'lg', children }: Props) {
  return (
    <div
      className={clsx(
        'w-full mx-auto border sm:rounded-xl shadow-md bg-white py-8 px-6',
        {
          'sm:max-w-lg': size === 'lg',
          'sm:max-w-xl': size === 'xl',
          'sm:max-w-2xl': size === '2xl',
          'sm:max-w-3xl': size === '3xl',
          'sm:max-w-4xl': size === '4xl',
          'sm:max-w-5xl': size === '5xl'
        }
      )}
    >
      {title && (
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-3xl'>{title}</h1>
        </div>
      )}

      {children}
    </div>
  );
}
