import { ComponentProps, forwardRef } from 'react';

interface Props extends ComponentProps<'textarea'> {
  label: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <label>
        <div className='font-medium text-gray-800 mb-1'>{label}</div>
        <textarea
          className='text-gray-800 w-full rounded-lg px-4 py-2 border focus:outline-none focus:border-brand-600 focus:border-2 focus:ring-brand-500 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20'
          rows={4}
          ref={ref}
          placeholder={`${label}...`}
          {...props}
        />
      </label>
    );
  }
);
