import { client } from "../../services/prisma"

export class LoadAllOrdersRepository {
  async load() {
    try {
      const orders = await client.order.findMany({
        include: {
          address: true,
          user: true,
          items: true
        }
      })
      return orders
    } catch (error) {
      throw new Error(error.message)
    }
  }
}