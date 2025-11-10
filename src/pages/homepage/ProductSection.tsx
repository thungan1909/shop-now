import ProductItem from "../product/ProductItem";
import type { ProductDTO } from "../../types/dtos/product.dto";
import { useEffect, useState } from "react";
import { useGetProductList } from "../../hooks/product/useGetProductList.hook";
import CButton from "../../components/atoms/CButton/CButton";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../routers/constants";
import { motion } from "framer-motion";

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
    <section className="relative py-16 px-6">
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 -z-10" />

      {/* Section Header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold text-center mb-10 text-gray-800"
      >
        {title}
      </motion.h2>

      {/* Product Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
      >
        {(type === "new" ? products.slice(0, 4) : products.slice(5, 9)).map(
          (product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4"
            >
              <ProductItem product={product} />
            </motion.div>
          )
        )}
      </motion.div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mt-12"
      >
        <CButton
          variant="outlined"
          onClick={() => navigate(ROUTES_CONSTANTS.PRODUCT)}
          className="border-2 border-black text-black hover:bg-black hover:text-white transition rounded-full px-8 py-3 font-semibold"
          isRounded
        >
          View All
        </CButton>
      </motion.div>
    </section>
  );
};

export default ProductSection;
