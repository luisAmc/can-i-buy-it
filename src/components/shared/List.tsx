import clsx from 'clsx';
import { ReactNode } from 'react';

interface ListItemProps {
  children: ReactNode;
}

export function ListItem({ children }: ListItemProps) {
  return <li>{children}</li>;
}

interface ListProps<T> {
  className?: string;
  values: readonly T[];
  children: (item: T, i: number) => ReactNode;
}

export function List<T>({ className, values, children }: ListProps<T>) {
  return (
    <div>
      <ul role='list' className={clsx('divide-y', className)}>
        {values.map((node, i) => children(node, i))}
      </ul>
    </div>
  );
}
