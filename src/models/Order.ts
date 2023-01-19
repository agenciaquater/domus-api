import { Product } from "./Product";

export interface Order {
  id?: string | undefined;
  items: Product[]
  address: string
  user: string
  total_price: number
}