import { client } from "../../services/prisma"
import { defaultOrderInclude } from "./defaultOrderReturn"

export class UpdateOrderStatusRepository {
  async update(orderId: string, status: string) {
    try { 
      const order = await client.order.update({
        where: {
          id: orderId,
        },
        data: {
          status,
        },
        include: defaultOrderInclude
      })
      return order
    } catch (error) {
      throw new Error(error.message)
    }
  }
}