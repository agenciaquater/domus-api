import { client } from "../../services/prisma"

export class DeleteCupomRepository {
  async delete(id: string) {
    try {
      const cupom = await client.cupom.delete({
        where: {
          id,
        },
        include: {
          products: true,
          categories: true
        }
      })
      return cupom
    } catch (error) {
      throw new Error(error.message)
    }
  }
}