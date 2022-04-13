import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from 'react';
import { ButtonOrLink, ButtonOrLinkProps } from './ButtonOrLink';

export interface Props extends ButtonOrLinkProps {
  variant?: 'default' | 'floating';
  color?: 'primary' | 'secondary' | 'danger';
  full?: boolean;
}

export function Button({
  variant = 'default',
  color = 'primary',
  full = false,
  ...props
}: Props) {
  return (
    <ButtonOrLink
      type='button'
      className={clsx(
        'w-full flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80 transition ease-in-out',
        full && 'sm:w-auto',
        variant === 'default' && 'px-4 py-2 font-medium rounded',
        variant === 'default' && {
          'bg-brand-200 text-brand-800': color === 'primary',
          'bg-gray-200 text-gray-900 focus:ring-gray-500':
            color === 'secondary',
          'bg-red-500 text-white focus:ring-red-500': color === 'danger'
        },
        variant === 'floating' &&
          'rounded-full px-4 py-3 text-base font-semibold shadow-md',
        variant === 'floating' && {
          'bg-brand-100 text-brand-500': color === 'primary',
          'bg-gray-100 text-gray-500 focus:ring-gray-500':
            color === 'secondary',
          'bg-red-100 text-red-500 focus:ring-red-500': color === 'danger'
        }
      )}
      {...props}
    />
  );
}
