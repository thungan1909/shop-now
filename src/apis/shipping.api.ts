import type { ShippingInfoDTO } from "../types/dtos/shipping.dto";
import { axiosInstance } from "./axiosInstance";

export const updateUserShippingQuery = {
  name: "updateUserShipping",
  fn: async (userId: number, shipping: ShippingInfoDTO) => {
    const res = await axiosInstance.put(`/users/${userId}`, {
      address: shipping,
    });
    return res.data;
  },
};
