import { client } from "src/services/prisma"

export class LoadProductByIdRepository {
  async load(id: string) {
    try {
      const product = await client.product.findFirst({
        where: {
          id
        },
        include: {
          category: true,
          matches: true
        }
      })

      return product
    } catch (error) {
      throw new Error(error.message)
    }
  }
}