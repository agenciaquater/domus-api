import { client } from "../../services/prisma"
import { defaultOrderInclude } from "./defaultOrderReturn"

export class LoadAllOrdersRepository {
  async load() {
    try {
      const orders = await client.order.findMany({
        include: defaultOrderInclude
      })
      return orders
    } catch (error) {
      throw new Error(error.message)
    }
  }
}