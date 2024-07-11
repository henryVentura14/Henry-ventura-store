import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { fetchProducts } from "@/services/productService";
import { Product, ProductContextType } from "@/types/Products.types";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const addProduct = (product: Product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const updateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const loadProducts = useCallback(async () => {
    try {
      const products = await fetchProducts();
      setProducts(products);
      localStorage.setItem("products", JSON.stringify(products));
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }, []);

  useEffect(() => {
    const localStorageProducts = localStorage.getItem("products");
    if (localStorageProducts) {
      setProducts(JSON.parse(localStorageProducts));
    } else {
      loadProducts();
    }
  }, [loadProducts]);

  const contextValue: ProductContextType = {
    products,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    loadProducts,
    modalContent,
    setModalContent,
    isModalOpen,
    setModalOpen,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
