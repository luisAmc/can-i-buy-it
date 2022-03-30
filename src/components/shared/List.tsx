import { ReactNode } from 'react';

interface ListItemProps {
  children: ReactNode;
}

export function ListItem({ children }: ListItemProps) {
  return <li>{children}</li>;
}

interface ListProps<T> {
  values: readonly T[];
  children: (item: T, i: number) => ReactNode;
}

export function List<T>({ values, children }: ListProps<T>) {
  return (
    <div>
      <ul role='list' className='divide-y'>
        {values.map((node, i) => children(node, i))}
      </ul>
    </div>
  );
}
