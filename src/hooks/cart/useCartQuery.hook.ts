import { useQuery } from "@tanstack/react-query";
import { getCartQuery } from "../../apis/cart.api";
import type { ProductDTO } from "../../types/dtos/product.dto";

export const useCartQuery = (userId?: number) => {
  const cartQuery = useQuery<ProductDTO[]>({
    queryKey: ["cart", userId],
    queryFn: () => getCartQuery.fn(userId!),
    enabled: !!userId,
  });

  return { cartQuery };
};
