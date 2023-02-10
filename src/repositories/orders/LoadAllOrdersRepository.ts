import { Order, Product } from "@prisma/client"
import { client } from "../../services/prisma"
import { defaultOrderInclude } from "./defaultOrderReturn"

interface ModifiedProduct extends Product{
  quantity: number
}

interface CompleteOrder extends Omit<Order, 'items'> {
  items: ModifiedProduct[]
}

export class LoadAllOrdersRepository {
  async load() {
    try {
      const prismaOrders = await client.order.findMany({
        include: defaultOrderInclude
      })
      if (!prismaOrders) {
        return
      }
      let orders: CompleteOrder[] = []
      for (let i = 0; i < prismaOrders.length; i++) {
        let items: ModifiedProduct[] = []
        const prismaItems = prismaOrders[i].items
        let currentItem: Product = {} as Product;
        for (let j = 0; j < prismaItems.length; j++) {
          if (currentItem.id !== prismaItems[j]) {
            const product = await client.product.findFirst({
              where: {
                id: prismaItems[j]
              }
            })
            if (!product) {
              return
            }
            const quantity = getQuantityOfItems(prismaItems, prismaItems[j])
            items.push({
              ...product,
              quantity,
            })
            currentItem = product
          }
        }
        orders.push({
          ...prismaOrders[i],
          items
        })
      }
      return orders
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