import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProductQuery } from "../../apis/cart.api";

export const useRemoveCartProduct = (userId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) =>
      removeProductQuery.fn({ productId, userId: userId! }),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      }
    },
  });
};
