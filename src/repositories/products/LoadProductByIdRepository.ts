import { client } from "../../services/prisma";
import { getS3ImageUrls } from "../../utils/get-s3-image-urls";

interface Image {
  name: string;
  url: string
}

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
      let images: Image[] = []
      product.images.map((image, index) => {
        images.push(shapeToObject(image, imageUrls[index]))
      })
      return {
        ...product,
        images,
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

function shapeToObject(imageName: string, imageUrl: string) {
  return {
    name: imageName,
    url: imageUrl
  }
}