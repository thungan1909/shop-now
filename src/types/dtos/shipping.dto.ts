export interface ShippingInfoDTO {
  recipientName: string;
  phone: string;
  email: string;
  postalCode: string;
  streetAddress: string;
  detailAddress?: string;
  deliveryNote?: string;
}

export interface PaymentInfoDTO {
  method: "card" | "paypal";
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}
