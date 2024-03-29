
export interface Product {
  id?: string;
  name: string
  description: string
  price: number
  sale_price?: number | undefined
  reference?: number
  volume: number
  recipient: string
  store: number
  grape: string
  color: string
  scent: string
  harmonization: string
  matchId?: string
  match: Product
  matches: string[]
  images: string[]
  categoryId?: string | undefined  
}