import React, { useState, useEffect, useRef, useCallback } from "react";
import type { ProductDTO } from "../../types/dtos/product.dto";
import { useGetProductList } from "../../hooks/product/useGetProductList.hook";
import { useSearchProducts } from "../../hooks/product/useSearchProducts.hook";
import ProductItem from "./ProductItem";
import FilterSection from "./FilterSection";
import { FaSearch } from "react-icons/fa";

const ProductList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Most Popular");
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        Home <span className="mx-2">›</span> Product
      </div>

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Product</h1>

        <div className="flex items-center gap-3">
          <p className="text-gray-500 text-sm">Showing 1–20 of 100 Products</p>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <span className="absolute right-2 top-2.5 text-gray-400 text-xs">
              ▼
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar Filter */}
        <FilterSection />

        {/* Product Grid */}
        <main className="flex-1">
          {/* Search bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full border border-gray-300 rounded-full py-3 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product, index) => (
              <ProductItem key={`${product.id}-${index}`} product={product} />
            ))}
          </div>

          {/* Loader / Infinite scroll */}
          {!searchTerm && (
            <div ref={loader} className="text-center p-6 text-gray-500">
              {isFetching
                ? "Loading more products..."
                : "Scroll down to load more"}
            </div>
          )}

          {/* Searching indicator */}
          {searchTerm && isSearching && (
            <div className="text-center p-6 text-gray-500">Searching...</div>
          )}

          {/* No results */}
          {searchTerm && !isSearching && displayedProducts.length === 0 && (
            <div className="text-center p-6 text-gray-400">
              No products found
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;
