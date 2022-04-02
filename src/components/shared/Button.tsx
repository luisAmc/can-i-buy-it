import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from 'react';

type ButtonOrLinkType = ComponentProps<'button'> & ComponentProps<'a'>;

interface ButtonOrLinkProps extends ButtonOrLinkType {
  preserveRedirect?: boolean;
}

function ButtonOrLink({ href, preserveRedirect, ...props }: ButtonOrLinkProps) {
  const router = useRouter();
  const isLink = typeof href !== 'undefined';
  const ButtonOrLink = isLink ? 'a' : 'button';

  let content = <ButtonOrLink {...props} />;

  if (isLink) {
    const finalHref =
      preserveRedirect && router.query.redirect
        ? `${href!}?redirect=${encodeURIComponent(
            router.query.redirect as string
          )}`
        : href!;

    return <Link href={finalHref}>{content}</Link>;
  }

  return content;
}

interface Props extends ButtonOrLinkProps {
  variant?: 'default' | 'floating';
  color?: 'primary' | 'secondary' | 'danger';
}

export function Button({
  variant = 'default',
  color = 'primary',
  ...props
}: Props) {
  return (
    <ButtonOrLink
      type='button'
      className={clsx(
        'w-full sm:w-auto flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80 transition ease-in-out',
        variant === 'default' && 'px-4 py-2 font-medium rounded',
        variant === 'default' && {
          'bg-brand-500 text-white': color === 'primary',
          'bg-gray-200 text-gray-900 focus:ring-gray-500':
            color === 'secondary',
          'bg-red-500 text-white focus:ring-red-500': color === 'danger'
        },
        variant === 'floating' &&
          'rounded-full px-4 py-3 text-base font-semibold shadow-md',
        variant === 'floating' && {
          'bg-brand-100 text-brand-500': color === 'primary',
          'bg-gray-100 text-gray-500 focus:ring-gray-500': color === 'secondary',
          'bg-red-100 text-red-500 focus:ring-red-500': color === 'danger'
        }
      )}
      {...props}
    />
  );
}
