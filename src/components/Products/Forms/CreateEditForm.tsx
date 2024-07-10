import React, { useState } from 'react';
import { useProductContext } from '../../../context/ProductContext';
import { createProduct, updateProduct as updateProductService } from '../../../services/productService';

interface CreateEditFormProps {
  onClose: () => void;
  product?: any;
}

const CreateEditForm: React.FC<CreateEditFormProps> = ({ onClose, product }) => {
  const { addProduct, updateProduct } = useProductContext();
  const [formData, setFormData] = useState(product || {
    title: '',
    price: 0,
    description: '',
    category: '',
    images: []
  });
  const [imageLink, setImageLink] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddImage = () => {
    if (imageLink && formData.images.length < 5) {
      setFormData({
        ...formData,
        images: [...formData.images, imageLink],
      });
      setImageLink('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      const updatedProduct = await updateProductService(product.id, formData);
      updateProduct(updatedProduct);
    } else {
      const newProduct = await createProduct(formData);
      addProduct(newProduct);
    }
    onClose();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-6">{product ? 'Editar Producto' : 'Crear Producto'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-6">
          <div className="flex-1">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
              >
                <option value="">Selecciona una categoría</option>
                <option value="Herramientas Eléctricas e Inalámbricas">Herramientas Eléctricas e Inalámbricas</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
                rows={4}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tarifa base</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
              />
            </div>
          </div>
          <div className="flex-1 bg-blue-100 p-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Añadir Imagen</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  className="p-3 border border-gray-300 rounded flex-grow"
                  placeholder="Añadir link de imagen"
                />
                <button type="button" onClick={handleAddImage} className="p-3 bg-blue-500 text-white rounded">Agregar</button>
              </div>
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {formData.images.map((image, index) => (
                <div key={index} className="relative w-24 h-24 flex-shrink-0">
                  <img src={image} alt={`Imagen ${index + 1}`} className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button type="button" onClick={onClose} className="mr-2 p-3 border border-gray-300 rounded">Cancelar</button>
          <button type="submit" className="p-3 bg-blue-500 text-white rounded">{product ? 'Actualizar' : 'Guardar'}</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditForm;
