import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "../../utils/notifyUtils";
import { clearCartQuery } from "../../apis/cart.api";

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => clearCartQuery.fn(userId),
    onSuccess: (_, userId) => {
      notify.success("Cart cleared successfully");
      // Xóa cache cart để cập nhật UI
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
    onError: (err: any) => {
      console.error("Failed to clear cart:", err);
      notify.error("Failed to clear cart");
    },
  });
};
