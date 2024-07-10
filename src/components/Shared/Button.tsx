import Image from 'next/image';
import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  srcImg?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className, srcImg }) => {
  return (
    <button
      onClick={onClick}
      className={`primary-button ${className}`}
    > 
      {srcImg && <Image src={srcImg} alt={label} width={16} height={16} />}
      {label}
    </button>
  );
};

export default Button;
