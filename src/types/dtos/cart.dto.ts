export interface AddToCartRequest {
  userId: number;
  productId: number;
  quantity: number;
}

export interface AddToCartResponse {
  id: number;
  products: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  total: number;
  discountedTotal: number;
  userId: number;
}
