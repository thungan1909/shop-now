import axios from "axios";
import type { ProductListResponseDTO } from "../types/dtos/product.dto";

export const getProductListQuery = {
  name: "getProductList",
  fn: async (limit = 20, skip = 0): Promise<ProductListResponseDTO> => {
    const res = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    return res.data;
  },
};

export const searchProductQuery = {
  name: "searchProduct",
  fn: async (query: string): Promise<ProductListResponseDTO> => {
    const res = await axios.get(
      `https://dummyjson.com/products/search?q=${query}`
    );
    return res.data;
  },
};
