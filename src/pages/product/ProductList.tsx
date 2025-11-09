import React, { useState, useEffect, useRef, useCallback } from "react";
import type { ProductDTO } from "../../types/dtos/product.dto";
import { useGetProductList } from "../../hooks/product/useGetProductList.hook";
import { useSearchProducts } from "../../hooks/product/useSearchProducts.hook";
import ProductItem from "./ProductItem";
import { FaSearch } from "react-icons/fa";

const ProductList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const loader = useRef<HTMLDivElement | null>(null);

  const { data, isFetching } = useGetProductList(20, page * 20);
  const { data: searchData, isFetching: isSearching } =
    useSearchProducts(searchTerm);

  useEffect(() => {
    if (data?.products && !searchTerm) {
      setProducts((prev) => [...prev, ...data.products]);
    }
  }, [data, searchTerm]);

  const loadMore = useCallback(() => {
    if (!isFetching && !searchTerm) setPage((prev) => prev + 1);
  }, [isFetching, searchTerm]);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value) {
      setProducts([]);
      setPage(0);
    }
  };

  const displayedProducts = searchTerm ? searchData?.products || [] : products;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full border border-gray-300 rounded-full py-3 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

      {/* Loader / Infinite scroll */}
      {!searchTerm && (
        <div ref={loader} className="text-center p-6 text-gray-500">
          {isFetching ? "Loading more products..." : "Scroll down to load more"}
        </div>
      )}

      {/* Searching indicator */}
      {searchTerm && isSearching && (
        <div className="text-center p-6 text-gray-500">Searching...</div>
      )}

      {/* No results */}
      {searchTerm && !isSearching && displayedProducts.length === 0 && (
        <div className="text-center p-6 text-gray-400">No products found</div>
      )}
    </div>
  );
};

export default ProductList;
