import { useRouter } from "next/router";
import { useProductContext } from "../../../context/ProductContext";
import { useEffect, useState } from "react";
import CreateEditForm from "../../../components/Products/Forms/CreateEditForm";
import { Product } from "../../../types/Products.types";

const ProductEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { products } = useProductContext();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    if (id && products.length > 0) {
      const foundProduct = products.find((prod) => prod.id === parseInt(id as string));
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return <CreateEditForm product={product} onClose={() => router.push('/')} />;
};

export default ProductEdit;
