import { ProductProvider } from "../context/ProductContext";
import ProductList from "../components/Products/ProductList";
import Modal from "../components/Shared/Modal";

const Home = () => {
  return (
    <ProductProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="mx-auto">
          <ProductList />
          <Modal />
        </div>
      </div>
    </ProductProvider>
  );
};

export default Home;
