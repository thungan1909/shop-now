import axios from "axios";
import { API_BASE_URL } from "../types";
import type { ShippingInfoDTO } from "../types/dtos/shipping.dto";
import { getAuthHeader } from "../utils/getAuthHeader";

export const updateUserShippingQuery = {
  name: "updateUserShipping",
  fn: async (userId: number, shipping: ShippingInfoDTO) => {
    const res = await axios.put(
      `${API_BASE_URL}/users/${userId}`,
      { address: shipping },
      { headers: getAuthHeader() }
    );
    return res.data;
  },
};
