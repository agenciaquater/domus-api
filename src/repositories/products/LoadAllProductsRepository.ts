import { Product } from "@prisma/client";
import { client } from "../../services/prisma";
import { getS3ImageUrls } from "../../utils/get-s3-image-urls";

export class LoadAllProductsRepository {
  async load() {
    try {
      const prismaProducts = await client.product.findMany({
        where: {
          disabledAt: null,
        },
        include: {
          category: true,
          matches: true
        }
      })
      if (!prismaProducts) {
        return null
      }
      let products: Product[] = []
      await Promise.all(
        prismaProducts.map(async product => {
          const imageUrls = await getS3ImageUrls(product.images)
          products.push({
            ...product,
            images: imageUrls
          })
        })
      )
      return products
    } catch (error) {
      throw new Error(error.message)
    }
  }
}