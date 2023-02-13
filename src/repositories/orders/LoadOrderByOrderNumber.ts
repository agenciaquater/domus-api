import { Product } from "@prisma/client"
import { client } from "../../services/prisma"

interface ModifiedProduct extends Product{
  quantity: number
}

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
          user: {
            select: {
              email: true,
              id: true,
              full_name: true,
              cpf: true
            }
          }
        }
      })
      if (!order) {
        return
      }
      let items: ModifiedProduct[] = []
      let currentItem: string = ''
      for (let i = 0; i < order.items.length; i++) {
        if (currentItem !== order.items[i]) {
          const product = await client.product.findFirst({
            where: {
              id: order.items[i]
            }
          })
          if (!product) {
            return
          }
          const quantity = getQuantityOfItems(order.items, order.items[i])
          items.push({
            ...product,
            quantity,
          })
          currentItem = order.items[i]
        }
      }
      return {
        ...order,
        items
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

function getQuantityOfItems(group: string[], item: string): number {
  let quantity = 0
  group.map(groupItem => {
    if (groupItem === item) {
      quantity += 1
    }
  })
  return quantity
}