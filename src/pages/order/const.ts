import type { TShippingSchema } from "../../validation/shipping.schema";

export const shippingDefauftValue: TShippingSchema = {
  recipientName: "",
  phone: "",
  email: "",
  postalCode: "",
  streetAddress: "",
  detailAddress: "",
  deliveryNote: "",
};
export const EShippingStep = {
  ViewOrder: 0,
  InputShippingInfo: 1,
  Payment: 2,
  OrderSuccessful: 3,
};

export type EShippingStepType =
  (typeof EShippingStep)[keyof typeof EShippingStep];
