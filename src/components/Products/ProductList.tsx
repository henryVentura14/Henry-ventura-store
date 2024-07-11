import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useProductContext } from "../../context/ProductContext";
import { fetchProducts } from "../../services/productService";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { formatCurrency } from "@/utils/products.utils";
import DeleteConfirmation from "./Forms/DeleteConfirmation";

const ProductList = () => {
  const { products, setProducts, setModalContent, setModalOpen } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const getProducts = async () => {
      const productsFromAPI = await fetchProducts();
      setProducts(productsFromAPI);
    };
    getProducts();
  }, [setProducts]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  };

  const handleDeleteProductClick = (productId: number) => {
    setModalContent(<DeleteConfirmation productId={productId} onClose={handleCloseModal} />);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="p-4">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <table className="product-list w-full bg-white shadow rounded-2xl p-2  px-4">
        <thead className="bg-white text-blue-600 border-b interstate-bold text-xs">
          <tr>
            <th className="py-2 px-4 text-left rounded-2xl">Foto</th>
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Categoría</th>
            <th className="py-2 px-4 text-left">Descripción</th>
            <th className="py-2 px-4 text-left">Tarifa base</th>
            <th className="py-2 px-4 text-left rounded-2xl"></th>
          </tr>
        </thead>
        <tbody className="interstate-regular text-xs">
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 rounded">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={32}
                  height={32}
                  className="h-10 w-10 object-cover rounded"
                />
              </td>
              <td className="my-1 px-4 max-w-[150px] line-clamp-2">{product.title}</td>
              <td className="my-1 px-4">{product.category}</td>
              <td className="my-1 px-4 max-w-[230px] line-clamp-2">{product.description}</td>
              <td className="my-1 px-4">{formatCurrency(product.price)}</td>
              <td className="my-1 px-4 flex space-x-3">
                <Link href={`/products/${product.id}`} className="text-white bg-blue-500 hover:bg-blue-700 rounded-full py-2 px-4">
                  Ver
                </Link>
                <Link href={`/products/${product.id}`}>
                  <Image src="/assets/icons/edit.svg" alt="edit" width={24} height={24} />
                </Link>
                <button type="button" onClick={() => handleDeleteProductClick(product.id)}>
                  <Image src="/assets/icons/trash.svg" alt="delete" width={24} height={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
