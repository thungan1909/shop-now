export interface ProductDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export interface ProductListResponseDTO {
  products: ProductDTO[];
  total: number;
  skip: number;
  limit: number;
}
