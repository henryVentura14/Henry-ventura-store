import React, { useState } from "react";
import { useProductContext } from "../../../context/ProductContext";
import { createProduct, updateProduct as updateProductService } from "../../../services/productService";
import Image from "next/image";
import { CreateEditFormProps } from "@/types/Products.types";
import Button from "@/components/Shared/Button";

const CreateEditForm: React.FC<CreateEditFormProps> = ({ onClose, product }) => {
  const { addProduct, updateProduct } = useProductContext();
  const initialFormData = product || {
    title: "",
    price: 0,
    description: "",
    category: "",
    images: [] as string[] | string,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [imageLink, setImageLink] = useState("");

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
      setImageLink("");
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      images: updatedImages,
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

  const imagesArray = Array.isArray(formData.images) ? formData.images : [formData.images];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-6">{product ? "Editar Producto" : "Crear Producto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-6">
          <div className="flex-1">
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 mb-2">Nombre*</label>
              <input
                title="Nombre del producto"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-2xl w-full h-9 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 mb-2">Categoría*</label>
              <select
                title="Categoría del producto"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="px-3 py-4 border border-gray-300 rounded-2xl w-full h-9 text-sm"
              >
                <option value="">Selecciona una categoría</option>
                <option value="Herramientas Eléctricas e Inalámbricas">Herramientas Eléctricas e Inalámbricas</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 mb-2">Descripción*</label>
              <textarea
                title="Descripción del producto"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-2xl w-full h-24 resize-none text-sm"
                rows={4}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 mb-2">Tarifa base*</label>
              <input
                title="Tarifa base del producto"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-2xl w-full h-9 text-sm"
              />
            </div>
          </div>
          <div className="flex-1 bg-blue-100 p-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm interstate-bold text-blue-400 mb-2">Imágenes</label>
              <span className="text-sm text-gray-600 mt-2 mb-2">
                Añada los links de las imágenes relacionadas al producto.
              </span>
              <div className="flex space-x-1 mt-2">
                <input
                  type="text"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  className="p-3 border border-gray-300 rounded-2xl w-full h-9 text-sm"
                  placeholder="Añadir link de imagen"
                />
                <Button
                  label="Agregar"
                  onClick={handleAddImage}
                  className="text-white rounded-full bg-blue-500 w-16 h-9 px-2"
                />
              </div>
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {imagesArray.map((image: string, index: number) => (
                <div key={index} className="relative w-24 h-24 flex-shrink-0">
                  {/* <Image src={image} alt={`Imagen ${index + 1}`} className="w-full h-full object-cover rounded" /> */}
                  <Image
                  src={Array.isArray(product.image) ? product.image[0] : product.image}
                  alt={product.title}
                  width={32}
                  height={32}
                  className="h-10 w-10 object-cover rounded"
                />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            label="Guardar"
            className="text-white py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-700 text-xs w-40	h-10"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEditForm;
