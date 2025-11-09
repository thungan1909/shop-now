import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { searchProductQuery } from "../../apis/product.api";
import type { ProductListResponseDTO } from "../../types/dtos/product.dto";

export const useSearchProducts = (
  query: string,
  options?: UseQueryOptions<ProductListResponseDTO>
): UseQueryResult<ProductListResponseDTO> => {
  return useQuery<ProductListResponseDTO>({
    queryKey: [searchProductQuery.name, query],
    queryFn: async () => searchProductQuery.fn(query),
    enabled: !!query, // only fetch when query is not empty
    refetchOnWindowFocus: false,
    retry: 2,
    ...options,
  });
};
