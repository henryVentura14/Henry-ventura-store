import React, { useState, useEffect } from "react";
import { useProductContext } from "../../../context/ProductContext";
import { createProduct, updateProduct as updateProductService } from "../../../services/productService";
import ImageUploader from "../../Shared/ImageUploader";
import { CreateEditFormProps } from "@/types/Products.types";
import Button from "@/components/Shared/Button";
import { useRouter } from "next/router";

const CreateForm: React.FC<CreateEditFormProps> = ({ onClose, product }) => {
  const { addProduct, updateProduct } = useProductContext();
  const router = useRouter();

  const initialFormData = product || {
    title: "",
    price: 0,
    description: "",
    category: "",
    image: [] as string[] | string,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [images, setImages] = useState<string[]>(Array.isArray(formData.image) ? formData.image : [formData.image]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setFormData((prevFormData: typeof formData) => ({
      ...prevFormData,
      image: images,
    }));
  }, [images]);

  useEffect(() => {
    const isValid =
      formData.title !== "" &&
      formData.price > 0 &&
      formData.description !== "" &&
      formData.category !== "" &&
      images.length > 0;
    setIsFormValid(isValid);
  }, [formData, images]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      window.location.reload();
    } else {
      alert("Por favor completa todos los campos obligatorios antes de guardar.");
    }
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
                className="p-3 border border-gray-300 rounded-2xl w-full h-9 text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-400 mb-2">Categoría*</label>
              <select
                title="Categoría del producto"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg w-full h-10 text-sm appearance-none"
                required
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
                className="p-3 border border-gray-300 rounded-2xl w-full h-24 resize-none text-sm"
                rows={4}
                required
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
                required
              />
            </div>
          </div>
          <ImageUploader images={images} setImages={setImages} />
        </div>
        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            label="Guardar"
            disabled={!isFormValid}
            className={`text-white py-2 px-4 rounded-full bg-indigo-500 hover:bg-indigo-700 text-xs w-40 h-10 ${
              !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
