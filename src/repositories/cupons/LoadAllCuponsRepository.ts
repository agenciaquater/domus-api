import { client } from "../../services/prisma"

export class LoadAllCuponsRepository {
  async load() {
    try {
      const cupons = await client.cupom.findMany({
        include: {
          products: true,
          categories: true
        }
      })
      return cupons
    } catch (error) {
      throw new Error(error.message)
    }
  }
}