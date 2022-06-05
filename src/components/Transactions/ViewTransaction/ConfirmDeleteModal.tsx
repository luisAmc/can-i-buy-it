import {
  ExclamationCircleIcon,
  TrashIcon,
  XIcon
} from '@heroicons/react/outline';
import { Button } from 'src/components/shared/Button';
import { Modal, Props as ModalProps } from 'src/components/shared/Modal';

interface Props extends Omit<ModalProps, 'title' | 'children'> {
  onConfirm: () => unknown;
}

export function ConfirmDeleteModal({ open, onClose, onConfirm }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-center'>
          <div className='p-4 bg-red-100 rounded-full'>
            <ExclamationCircleIcon className='w-10 h-10 text-red-600' />
          </div>
        </div>

        <p className='text-center font-medium'>
          ¿Está seguro de eliminar la transacción actual?
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
          <Button color='danger' onClick={onConfirm}>
            <TrashIcon className='w-4 h-4 mr-1' />
            <span>Borrar</span>
          </Button>

          <Button color='secondary' onClick={onClose}>
            <XIcon className='w-4 h-4 mr-1' />
            <span>Cancelar</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
