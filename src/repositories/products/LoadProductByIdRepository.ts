import { getS3ImageUrls } from "src/utils/get-s3-image-urls";
import { client } from "../../services/prisma";

export class LoadProductByIdRepository {
  async load(id: string) {
    try {
      const product = await client.product.findFirst({
        where: {
          id
        },
        include: {
          category: true,
          matches: true
        }
      })
      if (!product) {
        return null
      }
      const imageUrls = await getS3ImageUrls(product.images)
      return {
        ...product,
        images: imageUrls
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}