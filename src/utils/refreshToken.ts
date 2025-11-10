import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { API_BASE_URL } from "../types";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken) return null;

  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error("Token refresh failed");

  const { accessToken } = await res.json();
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  return accessToken;
};
