export interface ProductDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  quantity?: number; // optional, because not all products may have it initially
  rating?: number;
  tags?: string[];
  category?: string;
  discountPercentage?: number;
  stock?: number;
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: {
    createdAt: string;
    updatedAt: string;
    barcode?: string;
    qrCode?: string;
  };
  images?: string[];
}

export interface ProductListResponseDTO {
  products: ProductDTO[];
  total: number;
  skip: number;
  limit: number;
}
