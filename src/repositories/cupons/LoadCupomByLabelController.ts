import { client } from "../../services/prisma"

export class LoadCupomByLabelRepository {
  async load(label: string) {
    try {
      const cupom = await client.cupom.findFirst({
        where: {
          label
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