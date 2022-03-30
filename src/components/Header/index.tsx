import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { formatDate } from 'src/utils/transforms';
import { HeaderQuery } from './__generated__/index.generated';

export const query = gql`
  query HeaderQuery {
    me {
      id
      username
    }
  }
`;

export function Header() {
  // const { data } = useQuery<HeaderQuery>(query);

  // if (!data?.me) return null;

  return (
    <div className=''>
      <div className='mx-auto max-w-7xl w-full flex justify-between py-8 px-4 xl:px-0'>
        <div className='flex flex-col space-y-2'>
          <div className='font-medium text-4xl text-slate-700'>
            {/* ¡Hola, {data.me.username}! */}
          </div>
          <div>{formatDate(new Date())}</div>
        </div>

        <div className='flex items-center space-x-2'>
          <div className='rounded-full bg-rose-300 w-10 h-10'></div>
          {/* <div className='font-medium text-sm'>{data.me.username}</div> */}
        </div>
      </div>
    </div>
  );
}
