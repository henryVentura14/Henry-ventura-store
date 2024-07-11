import Image from "next/image";
import React from "react";
import Button from "../Shared/Button";
import { useProductContext } from "../../context/ProductContext";
import CreateForm from "./Forms/CreateForm";

export default function Header() {
  const { setModalOpen, setModalContent } = useProductContext();

  const handleNewProductClick = () => {
    setModalContent(<CreateForm onClose={handleCloseModal} />);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <Button
        label="Nuevo producto"
        onClick={handleNewProductClick}
        className="text-white py-2 px-4 rounded-full"
        srcImg="/assets/icons/new-product.svg"
      />
      <Image src="/assets/LizitLogo.svg" alt="Logo" width={50} height={24} />
    </div>
  );
}
