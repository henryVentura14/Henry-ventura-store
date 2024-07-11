import { useRouter } from "next/router";
import { useProductContext } from "../../context/ProductContext";
import { useEffect, useState } from "react";
import { Product } from "../../types/Products.types";
import EditForm from "@/components/Products/Forms/EditForm";

const ProductDetail = () => {
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

  return <EditForm product={product} onClose={() => router.push('/')} disabled={true}/>;

};

export default ProductDetail;
