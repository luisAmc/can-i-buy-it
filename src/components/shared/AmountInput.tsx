import { ComponentProps, forwardRef } from 'react';

interface Props extends ComponentProps<'input'> {
  label: string;
}

export const AmountInput = forwardRef<HTMLInputElement, Props>(
 function AmountInput ({ label, ...props }, ref) {
    return (
      <input
        className='text-5xl text-center text-gray-800 w-full px-4 py-3 focus:outline-none focus:border-brand-600 focus:border-b-2 focus:ring-brand-500 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20'
        ref={ref}
        type='number'
        step='any'
        placeholder={`${label}...`}
        {...props}
      />
    );
  }
);
