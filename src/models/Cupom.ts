import { Category } from "./Category";
import { Product } from "./Product";

export interface Cupom {
  id?: string | null;
  label: string;
  type: string;
  value: number;
  minPurchaseValue?: number | null;
  maxDiscountValue?: number | null;
  categories: Category[];
  products: Product[];
  due_at?: Date | null;
}