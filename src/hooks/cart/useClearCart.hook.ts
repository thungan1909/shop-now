import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "../../utils/notifyUtils";
import { clearCartQuery } from "../../apis/cart.api";

export const useClearCart = (userId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCartQuery.fn({ userId: userId! }),
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
    onError: (err: any) => {
      console.error("Failed to clear cart:", err);
      notify.error("Failed to clear cart");
    },
  });
};
