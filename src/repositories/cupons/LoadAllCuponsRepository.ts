import { client } from "../../services/prisma"

const idAndName = {
  id: true,
  name: true,
}

export class LoadAllCuponsRepository {
  async load() {
    try {
      const cupons = await client.cupom.findMany({
        include: {
          products: true,
          categories: {
            select: {
              ...idAndName,
              child_category: {
                select: {
                  ...idAndName,
                  child_category: true
                }
              }
            }
          }
        }
      })
      return cupons
    } catch (error) {
      throw new Error(error.message)
    }
  }
}