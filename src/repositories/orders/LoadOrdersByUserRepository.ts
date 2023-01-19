import { client } from "../../services/prisma"
import { defaultOrderInclude } from "./defaultOrderReturn"

export class LoadOrdersByUserRepository {
  async load(userId: string) {
    try {
      const orders = await client.order.findMany({
        where: {
          userId,
        },
        include: defaultOrderInclude
      })
      return orders
    } catch (error) {
      throw new Error(error.message)
    }
  }
}