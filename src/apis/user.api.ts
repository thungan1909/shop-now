import type { QueryClient } from "@tanstack/react-query";
import { ACCESS_TOKEN, AUTH_INFO, REFRESH_TOKEN } from "../constants";
import { AUTH_QUERY_KEY } from "../constants/queryKey";
import { useLogout } from "../hooks/auth/useLogout.hook";
const API_BASE_URL = "https://dummyjson.com";

export const getUserInfoMutation = {
  name: "getCurrentUser",
  fn: async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) throw new Error("No access token found");

    const res = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch current user");
    }

    const data = await res.json();
    console.log(data);
    return data;
  },
};

export const fetchWithAuth = async (
  queryClient: QueryClient,
  url: string,
  options: RequestInit = {}
) => {
  let accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  const headers = new Headers(options.headers || {});
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  // Nếu token hết hạn (401), thử refresh token
  if (response.status === 401 && refreshToken) {
    const newToken = await refreshAccessToken(refreshToken);

    if (newToken) {
      // Lưu lại token mới
      localStorage.setItem(ACCESS_TOKEN, newToken);

      // Cập nhật auth info trong cache React Query
      const authInfo = JSON.parse(localStorage.getItem(AUTH_INFO) || "{}");
      queryClient.setQueryData([AUTH_QUERY_KEY], { ...authInfo, isAuth: true });

      // Thử gửi lại request cũ với token mới
      const retryHeaders = new Headers(options.headers || {});
      retryHeaders.set("Authorization", `Bearer ${newToken}`);

      const retryResponse = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: retryHeaders,
      });

      return retryResponse;
    } else {
      useLogout();
      throw new Error("Token expired. Please login again.");
    }
  }

  return response;
};

async function refreshAccessToken(
  refreshToken: string
): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
}
