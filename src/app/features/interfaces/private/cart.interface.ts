export interface CartProduct {
  id: number;
  quantity: number;
  title: string;
  price: number;
  discountPercentage: number;
}

export interface CartPayload {
  userId: number;
  products: CartProductPayload[];
}

export interface CartProductPayload {
  id: number;
  quantity: number;
}

export interface Cart {
  id: number;
  total: number;
  totalQuantity: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  products: CartProduct[];
}
