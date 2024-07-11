import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useProductContext } from "../../../context/ProductContext";
import { createProduct, updateProduct as updateProductService } from "../../../services/productService";
import Image from "next/image";
import Link from "next/link";
import { CreateEditFormProps } from "@/types/Products.types";
import Button from "@/components/Shared/Button";

const EditForm: React.FC<CreateEditFormProps> = ({ onClose, product, disabled }) => {
  const router = useRouter();
  const { addProduct, updateProduct } = useProductContext();

  const initialFormData = product || {
    title: "",
    price: 0,
    description: "",
    category: "",
    image: [] as string[] | string,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [imageLink, setImageLink] = useState("");
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = formData.title !== "" && formData.price > 0 && formData.description !== "" && formData.category !== "" && formData.image.length > 0;
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddImage = () => {
    if (isLinkValid && formData.image.length < 5) {
      setFormData({
        ...formData,
        image: [...formData.image, imageLink],
      });
      setImageLink("");
      setIsLinkValid(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formData.image];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      image: updatedImages,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      if (product) {
        const updatedProduct = await updateProductService(product.id, formData);
        updateProduct(updatedProduct);
      } else {
        const newProduct = await createProduct(formData);
        addProduct(newProduct);
      }
      onClose();
    } else {
      alert("Por favor completa todos los campos obligatorios antes de guardar.");
    }
  };

  const validateImageLink = (link: string) => {
    try {
      new URL(link);
      setIsLinkValid(true);
    } catch (error) {
      setIsLinkValid(false);
    }
  };

  const imagesArray = Array.isArray(formData.image) ? formData.image : [formData.image];

  const handleEditProduct = () => {
    if (product)
    router.push(`/products/edit/${product.id}`);
  };

  const handleViewProduct = () => {
    if (product)
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
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
                className={`p-3 border border-gray-300 rounded-2xl w-full h-9 text-sm ${disabled ? 'bg-gray-200' : ''}`}
                required
                disabled={disabled}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 mb-2">Categoría*</label>
              <select
                title="Categoría del producto"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`px-3 py-2 border border-gray-300 rounded-lg w-full h-10 text-sm appearance-none ${disabled ? 'bg-gray-200' : ''}`}
                required
                disabled={disabled}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Herramientas Eléctricas e Inalámbricas">Herramientas Eléctricas e Inalámbricas</option>
                <option value="Electrodomésticos">Electrodomésticos</option>
                <option value="Electrónica">Electrónica</option>
                <option value="Hogar y Jardín">Hogar y Jardín</option>
                <option value="Deportes y Aire Libre">Deportes y Aire Libre</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 mb-2">Descripción*</label>
              <textarea
                title="Descripción del producto"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`p-3 border border-gray-300 rounded-2xl w-full h-24 resize-none text-sm ${disabled ? 'bg-gray-200' : ''}`}
                rows={4}
                required
                disabled={disabled}
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
                className={`p-3 border border-gray-300 rounded-2xl w-full h-9 text-sm ${disabled ? 'bg-gray-200' : ''}`}
                required
                disabled={disabled}
              />
            </div>
          </div>
          <div className="flex-1 bg-blue-100 p-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 mb-2">Imágenes</label>
              <span className="text-sm text-gray-600 mt-2 mb-2">
                Añada los links de las imágenes relacionadas al producto.
              </span>
              <div className="flex space-x-1 mt-2">
                <input
                  type="text"
                  value={imageLink}
                  onChange={(e) => {
                    setImageLink(e.target.value);
                    validateImageLink(e.target.value);
                  }}
                  className={`p-3 border border-gray-300 rounded-2xl w-full h-9 text-sm ${disabled ? 'bg-gray-200' : ''}`}
                  placeholder="Añadir link de imagen"
                  disabled={disabled}
                />
                <Button
                  label="Agregar"
                  onClick={handleAddImage}
                  disabled={!isLinkValid || formData.image.length >= 5 || disabled}
                  className={`text-white rounded-full bg-blue-500 w-16 h-9 px-2 ${(!isLinkValid || formData.image.length >= 5 || disabled) ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
              </div>
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {imagesArray.map((image: string, index: number) => (
                <div key={index} className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={image}
                    alt={`Imagen ${index}`}
                    width={96}
                    height={96}
                    className="h-24 w-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 rounded-full bg-red-500 text-white p-1"
                    disabled={disabled}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          {disabled ? (
            <>
              <Button
                label="Volver"
                onClick={onClose}
                className="text-white py-2 px-4 rounded-full bg-gray-500 hover:bg-gray-700 text-xs w-20 h-10 mr-2"
              />
              <Button
                label="Eliminar"
                onClick={() => console.log("Eliminar")}
                className="text-white py-2 px-4 rounded-full bg-red-500 hover:bg-red-700 text-xs w-20 h-10 mr-2"
              />
              <Button
                label="Editar"
                className="text-white py-2 px-4 rounded-full bg-red-500 hover:bg-red-700 text-xs w-20 h-10 mr-2"
                onClick={handleEditProduct}
              />
            </>
          ) : (
            <>
              <Button
                type="button"
                label="Cancelar"
                onClick={handleViewProduct}
                className="text-white py-2 px-4 rounded-full bg-gray-500 hover:bg-gray-700 text-xs w-20 h-10 mr-2"
              />
              <Button
                type="submit"
                label="Guardar"
                disabled={!isFormValid}
                className={`text-white py-2 px-4 rounded-full bg-indigo-500 hover:bg-indigo-700 text-xs w-20 h-10 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditForm;
