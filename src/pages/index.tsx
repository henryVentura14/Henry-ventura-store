import { ProductProvider } from "../context/ProductContext";
import ProductList from "../components/Products/ProductList";
import Modal from "../components/Products/Modal";

const Home = () => {
  return (
    <ProductProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <ProductList />
          <Modal />
        </div>
      </div>
    </ProductProvider>
  );
};

export default Home;
