import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/Shared/Button";

interface ImageUploaderProps {
  images: string[];
  setImages: (images: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages }) => {
  const [imageLink, setImageLink] = useState("");
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleAddImage = () => {
    if (isLinkValid && images.length < 5) {
      setImages([...images, imageLink]);
      setImageLink("");
      setIsLinkValid(false);
    }
  };

  const handleSetMainImage = (index: number) => {
    if (index !== 0) {
      const newImages = [...images];
      const selectedImage = newImages.splice(index, 1)[0];
      newImages.unshift(selectedImage);
      setImages(newImages);
      setMainImageIndex(0);
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

  return (
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
            className="p-3 border border-gray-300 rounded-2xl w-full h-9 text-sm"
            placeholder="Añadir link de imagen"
          />
          <Button
            label="Agregar"
            onClick={handleAddImage}
            disabled={!isLinkValid || images.length >= 5}
            className={`text-white rounded-full bg-blue-500 w-16 h-9 px-2 ${
              !isLinkValid || images.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </div>
      </div>
      <div className="flex space-x-2 flex-col">
        <span className="text-center text-sm">Selecciona la imagen principal</span>
        <div className="flex justify-start items-center space-x-1">
          {images.map((image, index) => (
            <div key={index+image} className="relative w-24 h-24 flex-shrink-0">
              <input
                placeholder="Imagen principal"
                type="radio"
                name="mainImage"
                checked={mainImageIndex === index}
                onChange={() => handleSetMainImage(index)}
                className="relative bottom-0 left-1/2 transform -translate-x-1/2"
              />
              <Image
                src={image}
                alt={`Imagen ${index}`}
                width={96}
                height={96}
                className="h-24 w-24 object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
