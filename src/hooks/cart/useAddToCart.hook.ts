import { useMutation } from "@tanstack/react-query";
import type {
  AddToCartRequest,
  AddToCartResponse,
} from "../../types/dtos/cart.dto";
import { addToCartQuery } from "../../apis/cart.api";
import { notify } from "../../utils/notifyUtils";

export const useAddToCart = () => {
  return useMutation<AddToCartResponse, Error, AddToCartRequest>({
    mutationFn: async (payload) => addToCartQuery.fn(payload),
    onSuccess: (data) => {
      notify.success("Added to cart successfully");
    },
    onError: (error) => {
      console.error("Add to cart failed:", error);
    },
  });
};
