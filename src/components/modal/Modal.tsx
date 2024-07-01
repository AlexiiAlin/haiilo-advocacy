import React, { ReactNode } from 'react';
import './Modal.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <div>
            <cat-icon icon="cross-circle-outlined" size="l"/>
          </div>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
