import { ProductProvider } from '../context/ProductContext';
import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <ProductProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Product List</h1>
        <ProductList />
      </div>
    </ProductProvider>
  );
};

export default Home;
