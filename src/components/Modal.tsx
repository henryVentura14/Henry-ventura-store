import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import { createProduct, updateProduct } from '../services/productService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  const { addProduct, updateProduct: updateLocalProduct } = useProductContext();
  const [formData, setFormData] = useState(product || {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      const updatedProduct = await updateProduct(product.id, formData);
      updateLocalProduct(updatedProduct);
    } else {
      const newProduct = await createProduct(formData);
      addProduct(newProduct);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg font-bold mb-4">{product ? 'Edit Product' : 'Create Product'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <textarea
            name="description"
            value={formData.description}
            // onChange={handleChange}
            placeholder="Description"
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 p-2 border border-gray-300 rounded">Cancel</button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">{product ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
