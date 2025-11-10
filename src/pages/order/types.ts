import type { UseFormReturn } from "react-hook-form";
import type { TShippingSchema } from "../../validation/shipping.schema";

export interface CheckoutFormProps {
  onSubmitForm: (data: TShippingSchema) => void;
  formInstance: UseFormReturn<TShippingSchema>;
}

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity?: number;
}

export interface OrderSummaryProps {
  cartProducts: CartProduct[];
  onNext?: () => void;
}
