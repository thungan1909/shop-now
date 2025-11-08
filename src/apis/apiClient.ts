import axios from "axios";
const BASE_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");

  if (token && cfg.headers) cfg.headers["Authorization"] = `Bearer ${token}`;
  return cfg;
});

export default api;
