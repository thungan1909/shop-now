import { z } from "zod";

export const PaymentSchema = z.object({
  method: z.enum(["card", "paypal"]),
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  expiryDate: z.string().min(5, "Expiry date is required (MM/YY)"),
  cvv: z.string().min(3, "CVV must be 3 digits"),
});

export type TPaymentSchema = z.infer<typeof PaymentSchema>;
