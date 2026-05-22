export interface Product {
  id: number;
  title: string;
  images: string[];
  thumbnail: string;
  discountPercentage: number;
  rating: number;
  brand: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  description: string;
}

export interface ProductPayload {
  title: string;
  thumbnail: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}
