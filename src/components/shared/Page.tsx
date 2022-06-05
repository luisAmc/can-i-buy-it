import { ChevronLeftIcon } from '@heroicons/react/outline';
import { ReactNode } from 'react';
import { Button } from './Button';
import { Link } from './Link';

interface Props {
  href?: string;
  text?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function Page({ href, text, action, children }: Props) {
  return (
    <div className='max-w-7xl w-full flex-1 mx-auto px-4 pt-5 sm:px-6 lg:px-8'>
      {(href || text || action) && (
        <div className='flex items-center justify-between'>
          {(href || text) && (
            <div className='flex'>
              {href && text ? (
                <Button
                  href={href}
                  className='flex items-center pr-2 rounded-full bg-transparent hover:bg-gray-200 transition-colors ease-in-out'
                >
                  <ChevronLeftIcon className='w-5 h-5 mr-1' />
                  <span className='text-lg'>{text}</span>
                </Button>
              ) : (
                <>
                  {href && (
                    <Link href={href}>
                      <button className='rounded-full flex items-center justify-center hover:bg-gray-100 transition ease-in-out'>
                        <ChevronLeftIcon className='w-5 h-5' />
                      </button>
                    </Link>
                  )}

                  {text && <h1 className='text-lg font-normal'>{text}</h1>}
                </>
              )}
            </div>
          )}

          {action}
        </div>
      )}

      {children}
    </div>
  );
}
