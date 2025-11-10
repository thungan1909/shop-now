import ProductItem from "../product/ProductItem";
import type { ProductDTO } from "../../types/dtos/product.dto";
import { useEffect, useState } from "react";
import { useGetProductList } from "../../hooks/product/useGetProductList.hook";
import CButton from "../../components/atoms/CButton/CButton";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../routers/constants";

interface ProductSectionProps {
  title: string;
  type: "new" | "top";
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, type }) => {
  const { data } = useGetProductList(10);
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => [...prev, ...data.products]);
    }
  }, [data]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {type === "new"
          ? products
              .slice(0, 4)
              .map((product) => (
                <ProductItem key={product.id} product={product} />
              ))
          : products
              .slice(5, 9)
              .map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
      </div>

      <div className="text-center mt-8">
        <CButton
          variant="outlined"
          onClick={() => navigate(ROUTES_CONSTANTS.PRODUCT)}
        >
          View All
        </CButton>
      </div>
    </section>
  );
};

export default ProductSection;
