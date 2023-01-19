import { client } from "../../services/prisma"
import { defaultOrderInclude } from "./defaultOrderReturn"

export class DeleteOrderRepository {
  async delete(orderId: string) {
    try {
      const order = await client.order.delete({
        where: {
          id: orderId,
        },
        include: defaultOrderInclude
      })
      return order
    } catch (error) {
      throw new Error(error.message)
    }
  }
}