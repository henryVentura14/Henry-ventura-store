import React from 'react';
import { useProductContext } from '../../../context/ProductContext';
import { deleteProduct as deleteProductService } from '../../../services/productService';
import { DeleteConfirmationProps } from '@/types/Products.types';
import Button from '@/components/Shared/Button';


const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ productId, onClose }) => {
  const { deleteProduct } = useProductContext();

  const handleDelete = async () => {
    await deleteProductService(productId);
    deleteProduct(productId);
    onClose();
  };

  return (
    <div>
      <p>¿Está seguro que desea eliminar el producto?</p>
      <div className="flex justify-end mt-4">
        <Button label='Cancelar' type="button" onClick={onClose} className="mr-2 p-2 border border-indigo-500 rounded-full text-indigo-500 bg-transparent hover:bg-indigo-500 hover:text-white"/>
        <Button label='Confirmar' type='button' onClick={handleDelete} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700"/>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
