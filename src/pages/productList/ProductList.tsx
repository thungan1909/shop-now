import React, { useState, useEffect, useRef, useCallback } from "react";
import type { ProductDTO } from "../../types/dtos/product.dto";
import { useGetProductList } from "../../hooks/product/useGetProductList.hook";
import { useSearchProducts } from "../../hooks/product/useSearchProducts.hook";
import ProductItem from "./ProductItem";

const ProductList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const loader = useRef<HTMLDivElement | null>(null);

  // Normal product list
  const { data, isFetching } = useGetProductList(20, page * 20);

  // Search hook (only triggers if searchTerm !== "")
  const { data: searchData, isFetching: isSearching } =
    useSearchProducts(searchTerm);

  // When fetch success, append new products
  useEffect(() => {
    if (data?.products && !searchTerm) {
      setProducts((prev) => [...prev, ...data.products]);
    }
  }, [data, searchTerm]);

  // Infinite scroll
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

  // Handle search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value) {
      setProducts([]); // reset list when clearing search
      setPage(0);
    }
  };

  const displayedProducts = searchTerm ? searchData?.products || [] : products;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {displayedProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

      {!searchTerm && (
        <div ref={loader} className="text-center p-4 text-gray-400">
          {isFetching ? "Loading more..." : "Scroll down to load more"}
        </div>
      )}

      {searchTerm && isSearching && (
        <div className="text-center p-4 text-gray-400">Searching...</div>
      )}
    </div>
  );
};

export default ProductList;
