import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginDTO, LoginResponse } from "../../types/dtos/auth.dto";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginDTO>({
    mutationFn: async (data: LoginDTO) => {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          expiresInMins: 30,
        }),
        // credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const result = await res.json();
      return result;
    },

    onSuccess: async (data) => {
      try {
        const { token, id } = data;

        if (!id) {
          throw new Error("Missing ID in response");
        }

        localStorage.setItem("accessToken", token);

        const authInfo = {
          isAuth: true,
          userId: id,
        };
        localStorage.setItem("authInfo", JSON.stringify(authInfo));

        // Cập nhật cache React Query
        queryClient.setQueryData(["auth"], authInfo);
        await queryClient.invalidateQueries({ queryKey: ["auth"] });

        // (DummyJSON không có endpoint user info riêng,
        // nên dùng luôn data trả về từ login)
        queryClient.setQueryData(["userInfo"], data);
      } catch (error) {
        console.error("Error while handling login success:", error);
      }
    },
  });
};
