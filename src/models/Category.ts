import { Product } from "./Product";

export interface Category {
  id?: string;
  name: string;
  parent_category?: Category | undefined;
  child_category?: Category[] | undefined
  Product?: Product[] | undefined
}