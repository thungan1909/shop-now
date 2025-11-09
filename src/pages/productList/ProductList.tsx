import React, { useState, useEffect, useRef, useCallback } from "react";
import { useGetProductList } from "../../hooks/product/useGetProductList.hook";
import type { ProductDTO } from "../../types/dtos/product.dto";

const ProductList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const loader = useRef<HTMLDivElement | null>(null);

  const { data, isFetching } = useGetProductList(20, page * 20);

  // Khi fetch thành công, append thêm sản phẩm mới
  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => [...prev, ...data.products]);
    }
  }, [data]);

  // Infinite scroll
  const loadMore = useCallback(() => {
    if (!isFetching) setPage((prev) => prev + 1);
  }, [isFetching]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) loadMore();
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [loadMore]);

  // Search
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-3 shadow hover:shadow-md transition"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="font-semibold text-lg">{product.title}</h3>
            <p className="text-gray-500">${product.price}</p>
            <button
              onClick={() => alert(`${product.title} added to cart!`)}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div ref={loader} className="text-center p-4 text-gray-400">
        {isFetching ? "Loading more..." : "Scroll down to load more"}
      </div>
    </div>
  );
};

export default ProductList;
