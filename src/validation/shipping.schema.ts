import { z } from "zod";
import {
  invalidEmailMsg,
  invalidPhoneMsg,
  invalidShippingNameMsg,
  invalidStreetMsg,
  requiredEmailMsg,
  requiredPhoneMsg,
} from "../constants/message/validationMsg";

export const ShippingSchema = z.object({
  recipientName: z.string().min(1, invalidShippingNameMsg),
  phone: z
    .string()
    .min(1, requiredPhoneMsg)
    .regex(/^[0-9]+$/, invalidPhoneMsg),

  email: z.string().email(invalidEmailMsg).min(1, requiredEmailMsg),
  postalCode: z.string().optional(),
  streetAddress: z.string().optional(),
  detailAddress: z.string().min(1, invalidStreetMsg),
  deliveryNote: z.string().optional(),
});

export type TShippingSchema = z.infer<typeof ShippingSchema>;
