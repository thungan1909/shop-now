import { axiosInstance } from "./axiosInstance";

export const getUserInfoQuery = {
  name: "getCurrentUser",
  fn: async () => {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  },
};
