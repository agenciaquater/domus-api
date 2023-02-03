import { client } from "../../services/prisma";

export class CreateCupomRepository {
  async create(data: any) {
    try {
      const cupom = await client.cupom.create({
        data: {
          label: data.label,
          type: data.type,
          value: data.value,
          categories: {
            connect: data.categories
          },
          products: {
            connect: data.products
          },
          due_at: data.due_at,
          maxDiscountValue: data.maxDiscountValue,
          minPurchaseValue: data.minPurchaseValue
        },
        include: {
          products: {
            select: {
              id: true
            }
          },
          categories: {
            select: {
              id: true
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