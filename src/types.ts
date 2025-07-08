export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface Order {
  productId: number;
  quantity: number;
  name: string;
  email: string;
  phone: string;
}