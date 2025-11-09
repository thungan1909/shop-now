import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  AddToCartRequest,
  AddToCartResponse,
} from "../../types/dtos/cart.dto";
import { addToCartQuery } from "../../apis/cart.api";
import { notify } from "../../utils/notifyUtils";

interface UseAddToCartOptions {
  onSuccess?: (data: AddToCartResponse) => void;
  onError?: (error: unknown) => void;
}

export const useAddToCart = (options?: UseAddToCartOptions) => {
  const queryClient = useQueryClient();

  return useMutation<AddToCartResponse, unknown, AddToCartRequest>({
    mutationFn: (payload) => addToCartQuery.fn(payload),

    onSuccess: (data, variables) => {
      notify.success("Added to cart successfully");

      // Invalidate lại giỏ hàng để cập nhật UI
      if (variables.userId) {
        queryClient.invalidateQueries({ queryKey: ["cart", variables.userId] });
      }

      // Callback tùy chọn (ví dụ update UI cục bộ)
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      console.error("Add to cart failed:", error);
      notify.error("Failed to add product to cart");
      options?.onError?.(error);
    },
  });
};
