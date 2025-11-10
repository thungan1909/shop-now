import axios from "axios";
import type { ProductListResponseDTO } from "../types/dtos/product.dto";
import { API_BASE_URL } from "../types";

export const getProductListQuery = {
  name: "getProductList",
  fn: async (limit = 20, skip = 0): Promise<ProductListResponseDTO> => {
    const res = await axios.get(
      `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`
    );
    return res.data;
  },
};

export const searchProductQuery = {
  name: "searchProduct",
  fn: async (query: string): Promise<ProductListResponseDTO> => {
    const res = await axios.get(`${API_BASE_URL}/products/search?q=${query}`);
    return res.data;
  },
};
