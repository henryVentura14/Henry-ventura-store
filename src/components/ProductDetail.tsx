import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/router";
import { useProductContext } from "../context/ProductContext";
import { fetchProductById, deleteProduct as deleteProductAPI } from "../services/productService";
import Modal from "./Modal";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { products, updateProduct, deleteProduct } = useProductContext();
  const [product, setProduct] = useState(products.find((p) => p.id === Number(id)));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      if (!product && id) {
        const productFromAPI = await fetchProductById(Number(id));
        setProduct(productFromAPI);
      }
    };
    getProduct();
  }, [id, product]);

  const handleDelete = async () => {
    await deleteProductAPI(Number(id));
    deleteProduct(Number(id));
    router.push("/");
  };

  return (
    <div>
      {product && (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="mb-2">Price: ${product.price}</p>
          <p className="mb-2">Category: {product.category}</p>
          <p className="mb-2">Description: {product.description}</p>
          <div className="relative w-full h-96">
            <Image src={product.image} alt={product.title} layout="fill" objectFit="cover" className="rounded-lg" />
          </div>{" "}
          <div className="flex">
            <button onClick={() => setIsModalOpen(true)} className="mr-2 p-2 bg-blue-500 text-white rounded">
              Edit
            </button>
            <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded">
              Delete
            </button>
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={product} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
