import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AUTH_QUERY_KEY } from "../../constants/queryKey";
import { ACCESS_TOKEN, REFRESH_TOKEN, AUTH_INFO } from "../../constants";
import type { AuthenticationInfoType } from "../../types/auth";
import { ROUTES_CONSTANTS } from "../../routers/constants";
import { useAuthentication } from "./login.hook";

interface UseLogoutParams {
  redirect?: boolean;
}

interface LogOutDTO {} // để tương thích với kiểu mutation

// Hàm helper xoá token và localStorage
const clearPersistToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(AUTH_INFO);
};

export const logoutUser = () => {
  clearPersistToken();

  window.location.href = "/login";
};

export const useLogout = (
  params: UseLogoutParams = {
    redirect: true,
  }
) => {
  const { redirect } = params;
  const queryClient = useQueryClient();
  const { userId } = useAuthentication();

  return useMutation<null, LogOutDTO>({
    mutationFn: async () => {
      // --- Xoá token và thông tin auth ---
      clearPersistToken();

      // --- Xoá cache React Query cho auth ---
      queryClient.setQueryData<AuthenticationInfoType>([AUTH_QUERY_KEY], {
        isAuth: false,
      } as AuthenticationInfoType);
      queryClient.removeQueries({ queryKey: [AUTH_QUERY_KEY] });

      // --- Xoá cart localStorage của user ---
      if (userId) {
        localStorage.removeItem(`cart-${userId}`);
        // Xoá cache cart trong React Query
        queryClient.removeQueries({ queryKey: ["cart", userId] });
      }

      if (redirect) {
        window.location.href = ROUTES_CONSTANTS.AUTH.LOGIN;
      }

      return null;
    },
  });
};
