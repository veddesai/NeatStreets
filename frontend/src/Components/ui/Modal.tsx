import React from 'react';
import { VscCloseAll } from 'react-icons/vsc';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-slate-900 rounded-lg p-4 w-11/12 md:w-1/2">
        <button onClick={onClose} className="relative float-end my-4  text-slate-900 dark:text-gray-200">
        <VscCloseAll className='text-4xl' />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
