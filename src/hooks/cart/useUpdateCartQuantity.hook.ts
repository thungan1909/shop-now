import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuantityQuery } from "../../apis/cart.api";

export const useUpdateCartQuantity = (userId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { productId: number; quantity: number }) =>
      updateQuantityQuery.fn({ ...payload, userId: userId! }),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      }
    },
  });
};
