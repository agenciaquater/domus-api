import { Product } from "@prisma/client";
import { getS3ImageUrls } from "src/utils/get-s3-image-urls";
import { client } from "../../services/prisma";

export class LoadAllProductsRepository {
  async load() {
    try {
      const prismaProducts = await client.product.findMany({
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