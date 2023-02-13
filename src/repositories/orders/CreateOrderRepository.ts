import { Order } from "../../models/Order";
import { client } from "../../services/prisma";

export class CreateOrderRepository {
  async create(data: Order) {
    try {
      const order = await client.order.create({
        data: {
          invoice: {
            create: {
              total: data.invoice.total,
              installments: data.invoice.subtotal,
              cupomId: data.invoice.cupom,
              subtotal: data.invoice.subtotal
            }
          },
          items: data.items,
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
        select: {
          order_number: true
        }
      })

      return order
    } catch (error) {
      throw new Error(error.message)
    }
  }
}