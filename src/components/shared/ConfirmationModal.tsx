import { ComponentType, ReactNode } from 'react';
import { Modal, Props as ModalProps } from './Modal';

interface Props extends ModalProps {
  icon?: ComponentType<any>;
  children: ReactNode;
}

export function ConfirmationModal({ icon, open, onClose, children }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      {children}
    </Modal>
  );
}
