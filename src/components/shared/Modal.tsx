import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode, useState } from 'react';
import clsx from 'clsx';

export function useModal() {
  const [open, setOpen] = useState(false);

  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    props: {
      open,
      onClose() {
        setOpen(false);
      }
    }
  };
}

export interface Props {
  title?: string;
  open: boolean;
  onClose: () => void;
  size?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  children: ReactNode;
}

export function Modal({ title, open, onClose, size = 'md', children }: Props) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <div className='flex items-center justify-center min-h-screen px-4 text-center sm:block'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-30 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-end sm:items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel
                  className={clsx(
                    'w-full transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all',
                    {
                      'max-w-md': size === 'md',
                      'max-w-lg': size === 'lg',
                      'max-w-xl': size === 'xl',
                      'max-w-2xl': size === '2xl',
                      'max-w-3xl': size === '3xl',
                      'max-w-4xl': size === '4xl',
                      'max-w-5xl': size === '5xl'
                    }
                  )}
                >
                  {title && (
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900'
                    >
                      {title}
                    </Dialog.Title>
                  )}

                  <div className='mt-2'>{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
  // return (
  //   <Transition.Root show={open} as={Fragment}>
  //     <Dialog
  //       as='div'
  //       static
  //       className='fixed inset-0 z-10 overflow-y-auto'
  //       open={open}
  //       onClose={onClose}
  //     >
  //       <div className='flex items-center justify-center min-h-screen px-4 text-center sm:block'>
  //         <Transition.Child
  //           as={Fragment}
  //           enter='ease-out duration-300'
  //           enterFrom='opacity-0'
  //           enterTo='opacity-100'
  //           leave='ease-in duration-200'
  //           leaveFrom='opacity-100'
  //           leaveTo='opacity-0'
  //         >
  //           <Dialog.Overlay className='fixed inset-0 bg-black/40 transition-opacity' />
  //         </Transition.Child>
  //         {/* This element is to trick the browser into centering the modal contents. */}
  //         <span
  //           className='inline-block h-screen align-middle'
  //           aria-hidden='true'
  //         >
  //           &#8203;
  //         </span>
  //         <Transition.Child
  //           as={Fragment}
  //           enter='ease-out duration-300'
  //           enterFrom='opacity-0 scale-95'
  //           enterTo='opacity-100 scale-100'
  //           leave='ease-in duration-200'
  //           leaveFrom='opacity-100 scale-100'
  //           leaveTo='opacity-0 scale-95'
  //         >
  //           <div
  //             className={clsx(
  //               'inline-block text-left w-full align-middle transition-all transform shadow-xl',
  //               {
  //                 'max-w-md': size === 'md',
  //                 'max-w-lg': size === 'lg',
  //                 'max-w-xl': size === 'xl',
  //                 'max-w-2xl': size === '2xl',
  //                 'max-w-3xl': size === '3xl',
  //                 'max-w-4xl': size === '4xl',
  //                 'max-w-5xl': size === '5xl'
  //               }
  //             )}
  //           >
  //             <div className='rounded-xl bg-white'>
  //               <div className='p-6 w-full'>{children}</div>
  //             </div>
  //           </div>
  //         </Transition.Child>
  //       </div>
  //     </Dialog>
  //   </Transition.Root>
  // );
}
