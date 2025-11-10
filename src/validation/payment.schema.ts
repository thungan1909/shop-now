import { z } from "zod";

export const PaymentSchema = z.object({
  method: z.enum(["card", "paypal"]),
  cardNumber: z
    .string()
    .regex(
      /^\d{4}-\d{4}-\d{4}-\d{4}$/,
      "Card number must be in format 1234-5678-9012-3456"
    ),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z.string().regex(/^\d{3}$/, "CVV must be 3 digits"),
});

export type TPaymentSchema = z.infer<typeof PaymentSchema>;
