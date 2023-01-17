import { client } from "src/services/prisma"

export class LoadAllProductsRepository {
  async load() {
    try {
      const products = await client.product.findMany({
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