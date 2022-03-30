import clsx from 'clsx';
import { ReactNode } from 'react';

interface TableHeaderProps {
  label: string;
  className?: string;
}

export function TableHeader({ label, className }: TableHeaderProps) {
  return (
    <th
      className={clsx(
        'px-6 py-4 text-left text-sm font-semibold bg-white text-slate-700 uppercase tracking-wider',
        className
      )}
    >
      {label}
    </th>
  );
}

interface TableRowProps {
  children: ReactNode;
}

export function TableRow({ children }: TableRowProps) {
  return (
    <tr className='hover:bg-gray-100 flex flex-col sm:table-row transition ease-in-out'>
      {children}
    </tr>
  );
}

interface TableDataCellProps {
  children: ReactNode;
  className?: string;
}

export function TableDataCell({ children, className }: TableDataCellProps) {
  return (
    <td
      className={clsx('px-6 py-1 sm:py-3 whitespace-wrap text-sm', className)}
    >
      {children}
    </td>
  );
}

interface TableProps<T> {
  header: ReactNode;
  values: readonly T[];
  children: (items: T, i: number) => ReactNode;
}

export function Table<T>({ header, values, children }: TableProps<T>) {
  return (
    <div className='overflow-hidden'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr className='flex flex-col sm:table-row'>{header}</tr>
        </thead>

        <tbody className='bg-white divide-gray-200'>
          {values.map((node, i) => children(node, i))}
        </tbody>
      </table>
    </div>
  );
}
