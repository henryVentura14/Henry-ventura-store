import React from 'react';
import { useProductContext } from '../../../context/ProductContext';
import { deleteProduct as deleteProductService } from '../../../services/productService';
import { DeleteConfirmationProps } from '@/types/Products.types';


const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ productId, onClose }) => {
  const { deleteProduct } = useProductContext();

  const handleDelete = async () => {
    await deleteProductService(productId);
    deleteProduct(productId);
    onClose();
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
      <p>Are you sure you want to delete this product?</p>
      <div className="flex justify-end mt-4">
        <button type="button" onClick={onClose} className="mr-2 p-2 border border-gray-300 rounded">Cancel</button>
        <button type='button' onClick={handleDelete} className="p-2 bg-red-500 text-white rounded">Delete</button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
