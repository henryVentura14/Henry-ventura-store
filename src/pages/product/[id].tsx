import { ProductProvider } from '../../context/ProductContext';
import ProductDetail from '../../components/ProductDetail';

const ProductDetailPage = () => {
  return (
    <ProductProvider>
      <div className="container mx-auto p-4">
        <ProductDetail />
      </div>
    </ProductProvider>
  );
};

export default ProductDetailPage;
