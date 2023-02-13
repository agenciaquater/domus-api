import { client } from "../../services/prisma"

export class LoadOrderByOrderNumberRepository {
  async load(orderNumber: string) {
    try { 
      const order = await client.order.findFirst({
        where: {
          order_number: parseInt(orderNumber)
        },
        include: {
          address: true,
          invoice: true,
          user: true
        }
      })
      return order
    } catch (error) {
      throw new Error(error.message)
    }
  }
}