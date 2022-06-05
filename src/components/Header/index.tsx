import { formatDate } from 'src/utils/transforms';

interface Props {
  me: {
    username: string;
  };
}

export function Header({ me }: Props) {
  return (
    <div className=''>
      <div className='mx-auto max-w-7xl w-full flex justify-between py-8 px-4 xl:px-0'>
        <div className='flex flex-col space-y-2'>
          <div className='font-medium text-4xl text-slate-700'>
            ¡Hola, {me.username}!
          </div>
          <div>{formatDate(new Date(), 'extended')}</div>
        </div>

        <div className='flex items-center space-x-2'>
          <div className='rounded-full bg-rose-300 w-10 h-10'></div>
          <div className='font-medium text-sm'>{me.username}</div>
        </div>
      </div>
    </div>
  );
}
