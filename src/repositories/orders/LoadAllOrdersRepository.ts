import { Order, Product } from "@prisma/client"
import { client } from "../../services/prisma"
import { defaultOrderInclude } from "./defaultOrderReturn"

interface ModifiedProduct extends Product{
  quantity: number
}

interface CompleteOrder extends Omit<Order, 'items'> {
  items: ModifiedProduct[]
}

export class LoadAllOrdersRepository {
  async load() {
    try {
      const prismaOrders = await client.order.findMany({
        include: defaultOrderInclude
      })
      let orders: CompleteOrder[] = []
      return orders
    } catch (error) {
      throw new Error(error.message)
    }
  }
}