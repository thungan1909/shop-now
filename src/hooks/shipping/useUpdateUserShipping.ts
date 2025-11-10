import { useMutation } from "@tanstack/react-query";
import { notify } from "../../utils/notifyUtils";
import { updateUserShippingQuery } from "../../apis/shipping.api";
import type { ShippingInfoDTO } from "../../types/dtos/shipping.dto";
import type { ApiError } from "../../types/api";

export const useUpdateUserShipping = () => {
  return useMutation({
    mutationFn: (params: { userId: number; shipping: ShippingInfoDTO }) =>
      updateUserShippingQuery.fn(params.userId, params.shipping),
    onSuccess: () => {
      notify.success("Shipping info updated successfully");
    },
    onError: (err: ApiError) => {
      console.error("Failed to update shipping info:", err);
      notify.error("Failed to update shipping info");
    },
  });
};
