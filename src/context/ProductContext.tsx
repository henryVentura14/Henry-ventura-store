import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
