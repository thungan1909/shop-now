import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "../../utils/notifyUtils";
import { clearCartQuery } from "../../apis/cart.api";
import type { ApiError } from "../../types/api";

export const useClearCart = (userId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCartQuery.fn({ userId: userId! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
    onError: (err: ApiError) => {
      console.error("Failed to clear cart:", err.message);
      notify.error(err.message || "Failed to clear cart");
    },
  });
};
