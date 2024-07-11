import React from 'react';
import { useProductContext } from '../../context/ProductContext';
import Image from 'next/image';

const Modal: React.FC = () => {
  const { isModalOpen, setModalOpen, modalContent } = useProductContext();

  const handleClose = () => {
    setModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
      <div className="bg-white p-4 rounded-3xl w-auto">
        <div className='flex items-center justify-end py-2'>
        <button type='button' onClick={handleClose}>
          <Image src="/assets/icons/close.svg" alt="Logo" width={26} height={26} />
        </button>
        </div>
        {modalContent}
      </div>
    </div>
  );
};

export default Modal;
