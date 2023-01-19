import { Order } from "../../models/Order";
import { client } from "../../services/prisma";

export class CreateOrderRepository {
  async create(data: Order) {
    try {
      const order = await client.order.create({
        data: {
          total_price: data.total_price,
          items: {
            connect: data.items
          },
          address: {
            connect: data.address
          },
          user: {
            connect: data.user
          }
        }
      })

      return order
    } catch (error) {
      throw new Error(error.message)
    }
  }
}