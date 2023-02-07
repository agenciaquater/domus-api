import { client } from "../../services/prisma"

const idAndName = {
  id: true,
  name: true,
}

export class LoadCupomByLabelRepository {
  async load(label: string) {
    try {
      const cupom = await client.cupom.findFirst({
        where: {
          label
        },
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
      return cupom
    } catch (error) {
      throw new Error(error.message)
    }
  }
}