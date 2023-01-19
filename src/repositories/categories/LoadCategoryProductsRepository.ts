import { Product } from "@prisma/client";
import { client } from "../../services/prisma";

export class LoadCategoryProductsRepository {
  async load(categoryId: string) {
    try {
      const prismaCategory = await client.category.findFirst({
        where: {
          id: categoryId
        },
        include: {
          Product: true
        }
      })

      let products: Product[] = []
      
      prismaCategory?.Product.map(product => products.push(product))

      return products
    } catch (error) {
      throw new Error(error.message)
    }
  }
}