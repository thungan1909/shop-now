import { ACCESS_TOKEN } from "../constants";

export const getAuthHeader = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) throw new Error("No access token");
  return { Authorization: `Bearer ${token}` };
};
