import { Address } from "./Address";
import { Product } from "./Product";
import { User } from "./User";

export interface Order {
  id?: string | undefined;
  items: Product[]
  address: Address
  user: User
  total_price: number
}