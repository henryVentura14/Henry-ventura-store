import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useProductContext } from "../../../context/ProductContext";
import { createProduct, updateProduct as updateProductService } from "../../../services/productService";
import Image from "next/image";
import { CreateEditFormProps } from "@/types/Products.types";
import Button from "@/components/Shared/Button";
import DeleteConfirmation from "./DeleteConfirmation";
import Gallery from "../../Shared/Gallery";

const EditForm: React.FC<CreateEditFormProps> = ({ onClose, product, disabled }) => {
  const router = useRouter();
  const { addProduct, updateProduct, setModalContent, setModalOpen } = useProductContext();

  const initialFormData = product || {
    title: "",
    price: 0,
    description: "",
    category: "",
    image: [] as string[] | string,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      formData.title !== "" &&
      formData.price > 0 &&
      formData.description !== "" &&
      formData.category !== "" &&
      formData.image.length > 0;
    setIsFormValid(isValid);
  }, [formData]);

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
    } else {
      alert("Por favor completa todos los campos obligatorios antes de guardar.");
    }
  };

  const imagesArray = Array.isArray(formData.image) ? formData.image : [formData.image];

  const handleEditProduct = () => {
    if (product) router.push(`/products/edit/${product.id}`);
  };

  const handleViewProduct = () => {
    if (product) router.push(`/products/${product.id}`);
  };

  const goToBack = () => {
    router.push(`/`);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  const handleDeleteProductClick = () => {
    console.log("handleDeleteProductClick");
    setModalContent(<DeleteConfirmation productId={product.id} onClose={handleCloseModal} />);
    setModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg pt-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex justify-center items-center">
        <Button onClick={goToBack} className="w-10 rounded-xl	 bg-soft-blue" srcImg="/assets/icons/arrow.svg" />
        <h1 className="text-2xl font-bold ml-2">{formData.title || "Nuevo Producto"}</h1>
        </div>
        <Image src="/assets/LizitLogo.svg" alt="Logo" width={50} height={24} />
      </div>
      
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
                className={`p-3 border border-gray-300 rounded-2xl w-full h-9 text-sm ${disabled ? "bg-gray-200" : ""}`}
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
                className={`px-3 py-2 border border-gray-300 rounded-lg w-full h-10 text-sm appearance-none ${
                  disabled ? "bg-gray-200" : ""
                }`}
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
                className={`p-3 border border-gray-300 rounded-2xl w-full h-24 resize-none text-sm ${
                  disabled ? "bg-gray-200" : ""
                }`}
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
                className={`p-3 border border-gray-300 rounded-2xl w-full h-9 text-sm ${disabled ? "bg-gray-200" : ""}`}
                required
                disabled={disabled}
              />
            </div>
          </div>
          <div className="flex-1 p-4 rounded-lg">
            {imagesArray.length > 0 && <Gallery images={imagesArray} />}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          {disabled ? (
            <>
              <Button
                label="Volver"
                onClick={goToBack}
                className="p-2 border border-indigo-500 rounded-full text-indigo-500 bg-transparent hover:bg-indigo-500 hover:text-white"
              />
              <Button
                label="Eliminar"
                className="text-white py-2 px-4 rounded-full bg-red-500 hover:bg-red-700 text-xs ml-2"
                onClick={handleDeleteProductClick}
              />
              <Button
                label="Editar"
                className="text-white py-2 px-4 rounded-full bg-indigo-500 hover:bg-indigo-700 text-xs ml-2"
                onClick={handleEditProduct}
              />
            </>
          ) : (
            <>
              <Button
                type="button"
                label="Cancelar"
                onClick={handleViewProduct}
                className="p-2 border border-indigo-500 rounded-full text-indigo-500 bg-transparent hover:bg-indigo-500 hover:text-white"
              />
              <Button
                type="submit"
                label="Guardar"
                disabled={!isFormValid}
                className={`text-white py-2 px-4 rounded-full bg-indigo-500 hover:bg-indigo-700 text-xs ml-2 ${
                  !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditForm;
