import React, { useState } from 'react';
import Image from 'next/image';

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex">
      <div className="w-full h-80 relative">
        <Image
          src={selectedImage}
          alt="Imagen principal"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col ml-4 space-y-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative w-24 h-24 cursor-pointer ${
              image === selectedImage ? 'shadow' : ''
            }`}
            onClick={() => handleImageClick(image)}
          >
            <Image
              src={image}
              alt={`Miniatura ${index}`}
              width={64}
              height={64}
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
