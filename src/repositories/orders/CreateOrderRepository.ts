import { Order } from "../../models/Order";
import { client } from "../../services/prisma";
import { defaultOrderInclude } from "./defaultOrderReturn";

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
            connect: {
              id: data.address
            }
          },
          user: {
            connect: {
              id: data.user
            }
          },
          order_number: data.order_number
        },
        include: defaultOrderInclude
      })

      return order
    } catch (error) {
      throw new Error(error.message)
    }
  }
}