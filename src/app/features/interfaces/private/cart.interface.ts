import { Product } from './product.interface';

export interface Cart {
  id: number;
  totalPrice: number;
  userId: number;
  totalItems: number;
  products: Product[];
}
