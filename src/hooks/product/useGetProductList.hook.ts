import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { ProductListResponseDTO } from "../../types/dtos/product.dto";
import { getProductListQuery } from "../../apis/product.api";

export const useGetProductList = (
  limit = 20,
  skip = 0,
  options?: UseQueryOptions<ProductListResponseDTO>
): UseQueryResult<ProductListResponseDTO> => {
  return useQuery<ProductListResponseDTO>({
    queryKey: [getProductListQuery.name, limit, skip],
    queryFn: async () => getProductListQuery.fn(limit, skip),
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 3000,
    ...options,
  });
};
