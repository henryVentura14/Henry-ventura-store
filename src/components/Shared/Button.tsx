import { ButtonProps } from '@/types/Products.types';
import Image from 'next/image';
import React from 'react';

const Button: React.FC<ButtonProps> = ({ label, onClick, className, srcImg, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`primary-button ${className}`}
    > 
      {srcImg && <Image src={srcImg} alt={label} width={16} height={16} />}
      {label}
    </button>
  );
};

export default Button;
