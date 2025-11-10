export interface ShippingInfoDTO {
  recipientName: string;
  phone: string;
  email: string;
  postalCode: string;
  streetAddress: string;
  detailAddress?: string;
  deliveryNote?: string;
}
