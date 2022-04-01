import clsx from 'clsx';

export interface Props {
  label: string;
  size?: 'base' | 'tiny';
  color?:
    | 'teal'
    | 'cyan'
    | 'blue'
    | 'sky'
    | 'red'
    | 'rose'
    | 'pink'
    | 'purple'
    | 'yellow'
    | 'gray';
}

export function Pill({ label, size = 'base', color = 'gray' }: Props) {
  return (
    <span
      className={clsx(
        'text-xs font-medium leading-5 px-2 py-1 inline-flex rounded-full',
        {
          'px-2 py-0': size === 'tiny',
          'px-2 py-1': size === 'base'
        },
        {
          'bg-teal-100 text-teal-800': color === 'teal',
          'bg-cyan-100 text-cyan-800': color === 'cyan',
          'bg-blue-100 text-blue-800': color === 'blue',
          'bg-sky-100 text-sky-800': color === 'sky',
          'bg-red-100 text-red-800': color === 'red',
          'bg-rose-100 text-rose-800': color === 'rose',
          'bg-pink-100 text-pink-800': color === 'pink',
          'bg-purple-100 text-purple-800': color === 'purple',
          'bg-yellow-100 text-yellow-800': color === 'yellow',
          'bg-gray-100 text-gray-800': color === 'gray'
        }
      )}
    >
      {label}
    </span>
  );
}
