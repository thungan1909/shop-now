import axios from "axios";
import type {
  AddToCartRequest,
  AddToCartResponse,
} from "../types/dtos/cart.dto";

export const addToCartQuery = {
  name: "addToCart",
  fn: async ({
    userId,
    productId,
    quantity,
  }: AddToCartRequest): Promise<AddToCartResponse> => {
    const res = await axios.post("https://dummyjson.com/carts/add", {
      userId,
      products: [{ id: productId, quantity }],
    });
    return res.data;
  },
};
