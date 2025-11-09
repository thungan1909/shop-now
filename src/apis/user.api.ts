import { ACCESS_TOKEN } from "../constants";

export const getUserInfoMutation = {
  name: "getCurrentUser",
  fn: async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    console.log(token);
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

    return res.json();
  },
};
