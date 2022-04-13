import { ComponentProps, forwardRef } from 'react';

interface Props extends ComponentProps<'input'> {
  label: string;
}

export const BudgetInput = forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <label className='grid grid-cols-2 items-center py-2'>
        <div className='font-medium text-slate-700 mr-1'>{label}</div>
        <input
          className='text-slate-700 text-lg w-full px-4 py-2 focus:outline-none focus:border-brand-600 border-b-2 border-transparent focus:ring-brand-500 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20'
          ref={ref}
          type='number'
          step='any'
          placeholder='0.0'
          {...props}
        />
      </label>
    );
  }
);
