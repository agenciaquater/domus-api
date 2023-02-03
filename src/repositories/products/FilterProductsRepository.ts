import { client } from "../../services/prisma"

export class FilterProductsRepository {
  async filter(key: string, value: any) {
    try {
      if (key === 'categoryId') {
        const products = await client.product.findMany({
          where: {
            category: {
              parent_categoryId: value
            },
          },
          include: {
            category: {
              select: {
                parent_categoryId: true
              }
            }
          }
          // select: {
          //   category: {
          //     select: {
          //       child_category: true
          //     }
          //   }
          // }
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