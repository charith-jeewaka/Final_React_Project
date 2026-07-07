import type { Item } from "./Item";

export interface CartItem extends Item {
  quantity: number;
}
