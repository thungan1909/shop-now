import ProductItem from "../product/ProductItem";
import type { ProductDTO } from "../../types/dtos/product.dto";
import { useEffect, useState } from "react";
import { useGetProductList } from "../../hooks/product/useGetProductList.hook";

interface ProductSectionProps {
  title: string;
  type: "new" | "top";
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, type }) => {
  //   const { data, isFetching } = useGetProductList(4, 0);
  //   const products = data?.products || [];
  const [page, setPage] = useState(0);

  const { data, isFetching } = useGetProductList(20, page * 20);
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
        {products.slice(0, 4).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition">
          View All
        </button>
      </div>
    </section>
  );
};

export default ProductSection;
