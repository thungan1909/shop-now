import { jwtDecode } from "jwt-decode";
import { AUTH_INFO } from "./../../constants/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginDTO, LoginResponse } from "../../types/dtos/auth.dto";
import type { AuthenticationInfoType } from "../../types/auth";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { AUTH_QUERY_KEY } from "../../constants/queryKey";
import { axiosInstance } from "../../apis/axiosInstance";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginDTO>({
    mutationFn: async (data: LoginDTO) => {
      // const res = await fetch("https://dummyjson.com/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     username: data.username,
      //     password: data.password,
      //     expiresInMins: 30,
      //   }),
      //   // credentials: "include",
      // });

      const res = await axiosInstance.post("/auth/login", {
        username: data.username,
        password: data.password,
        expiresInMins: 30,
      });

      if (res.status !== 200) {
        throw new Error("Login failed");
      }
      const result = res.data;

      return result;
    },

    onSuccess: async (data) => {
      try {
        const { accessToken, refreshToken, id } = data;

        if (!id) {
          throw new Error("Missing ID in response");
        }

        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);

        const decoded: any = jwtDecode(accessToken);
        console.log(decoded);

        //         {
        //     "id": 1,
        //     "username": "emilys",
        //     "email": "emily.johnson@x.dummyjson.com",
        //     "firstName": "Emily",
        //     "lastName": "Johnson",
        //     "gender": "female",
        //     "image": "https://dummyjson.com/icon/emilys/128",
        //     "iat": 1762743745,
        //     "exp": 1762745545
        // }

        const authInfo = {
          isAuth: true,
          userId: decoded?.id || id,
          username: decoded?.username,
          exp: decoded?.exp,
        };

        localStorage.setItem(AUTH_INFO, JSON.stringify(authInfo));

        queryClient.setQueryData([AUTH_QUERY_KEY], authInfo);
        await queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] });
      } catch (error) {
        console.error("Error while handling login success:", error);
      }
    },
  });
};

const _useAuthenticationCache = () => {
  const queryClient = useQueryClient();

  return useQuery<AuthenticationInfoType>({
    queryKey: [AUTH_QUERY_KEY],
    initialData: (() => {
      try {
        const data = localStorage.getItem(AUTH_INFO);

        return data ? JSON.parse(data) : ({} as AuthenticationInfoType);
      } catch (error) {
        console.error("Failed to parse authInfo from localStorage", error);
        return {} as AuthenticationInfoType;
      }
    })(),
    queryFn: () => {
      return (
        queryClient.getQueryData<AuthenticationInfoType>([AUTH_QUERY_KEY]) ??
        ({} as AuthenticationInfoType)
      );
    },
  });
};

export const useAuthentication = (): AuthenticationInfoType => {
  const { data } = _useAuthenticationCache();
  return data || ({} as AuthenticationInfoType);
};
