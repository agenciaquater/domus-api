import { client } from "../../services/prisma"

export class FilterProductsRepository {
  async filter(key: string, value: unknown) {
    try {
      if (key === 'categoryId') {
        const products = await client.product.findMany({
          where: {
            categoryId: key
          },
          select: {
            category: {
              select: {
                Product: true,
                child_category: {
                  select: {
                    Product: true,
                    child_category: {
                      select: {
                        Product: true
                      }
                    }
                  }
                }
              }
            }
          }
        })

        return products
      }
      
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