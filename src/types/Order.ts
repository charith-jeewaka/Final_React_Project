export interface OrderItem {
  item: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;

  items: OrderItem[];

  subtotal: number;
  deliveryFee: number;
  total: number;

  status: string;

  createdAt: string;
}
