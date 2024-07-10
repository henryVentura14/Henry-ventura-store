import React, { useEffect, useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import { fetchProducts } from '../services/productService';
import SearchBar from './SearchBar';

const ProductList = () => {
  const { products, setProducts } = useProductContext();
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
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.title}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
