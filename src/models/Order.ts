
export interface Order {
  id?: string | undefined;
  items: string[]
  address: string
  user: string
  invoice: {
    id?: string | undefined;
    total: number;
    installments: number;
    cupom?: string | undefined;
    subtotal: number
  },
  order_number: number,
  status?: string | undefined;
}