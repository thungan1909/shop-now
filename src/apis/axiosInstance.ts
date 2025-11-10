import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import { API_BASE_URL } from "../types";
import { refreshAccessToken } from "../utils/refreshToken";
import { logoutUser } from "../hooks/auth/useLogout.hook";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm access token vào mỗi request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Xử lý refresh token nếu bị 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa thử refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();

      if (newToken) {
        localStorage.setItem(ACCESS_TOKEN, newToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } else {
        logoutUser();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
