import { useQuery } from "@tanstack/react-query";

import type { UserDTO } from "../../types/dtos/user.dto";
import { getUserInfoQuery } from "../../apis/user.api";

// export const useGetCurrentUser = () => {
//   return useQuery({
//     queryKey: [getUserInfoMutation.name],
//     queryFn: getUserInfoMutation.fn,
//     staleTime: 1000 * 60 * 5,
//   });
// };

export const useGetCurrentUser = () => {
  return useQuery<UserDTO>({
    queryKey: [getUserInfoQuery.name],
    queryFn: getUserInfoQuery.fn,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    gcTime: 1000 * 60 * 10, // Giữ cache thêm 10 phút nữa trước khi bị xóa hẳn
    retry: 1, //  Nếu fail thì chỉ thử lại 1 lần
    refetchOnWindowFocus: false, //Không refetch khi đổi tab
  });
};
