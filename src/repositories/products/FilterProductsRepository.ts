import { client } from "../../services/prisma"

export class FilterProductsRepository {
  async filter(key: string, value: unknown) {
    try {
      const products = await client.product.findMany({
        where: {
          [key]: value
        },
        include: {
          category: true,
          matches: true
        }
      })
      return products
    } catch (error) {
      throw new Error(error.message)
    }
  }
}