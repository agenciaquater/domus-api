import { client } from "src/services/prisma"

export class UpdateProductRepository {
  async update(id: string, data: any) {
    try {
      const product = await client.product.update({
        where: {
          id: id
        },
        data: {
          ...data
        }
      })

      return product
    } catch (error) {
      throw new Error(error.message)
    }
  }
}