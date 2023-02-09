import { Product } from "@prisma/client";
import { client } from "../../services/prisma";
import { getS3ImageUrls } from "../../utils/get-s3-image-urls";

interface Image {
  name: string;
  url: string
}

interface ModifiedProduct extends Omit<Product, 'images'> {
  images: Image[]
}

export class FilterProductsRepository {
  async filter(key: string, value: any) {
    try {
      if (key === 'categoryId') {
        const prismaProducts = await client.product.findMany({
          where: {
            OR: [
              {
                category: {
                  parent_categoryId: value
                },
              },
              { categoryId: value },
              {
                category: {
                  parent_category: {
                    parent_categoryId: value
                  }
                }
              }
            ]
          },
          include: {
            category: {
              select: {
                parent_categoryId: true,
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
        if (!prismaProducts) {
          return null
        }
        let products: ModifiedProduct[] = []
        let images: Image[] = []
        await Promise.all(
          prismaProducts.map(async product => {
            if (product.disabledAt === null || product.disabledAt === undefined) {
              const imageUrls = await getS3ImageUrls(product.images)
              product.images.map((image, index) => {
                images.push(shapeToObject(image, imageUrls[index]))
              })
              products.push({
                ...product,
                images,
              })
            }
          })
        )
        return products
      }
      
      const prismaProducts = await client.product.findMany({
        where: {
          [key]: value
        },
        include: {
          category: true,
          matches: true
        }
      })
      if (!prismaProducts) {
        return null
      }
      let products: ModifiedProduct[] = []
      let images: Image[] = []
      await Promise.all(
        prismaProducts.map(async product => {
          if (product.disabledAt === null || product.disabledAt === undefined) {
            const imageUrls = await getS3ImageUrls(product.images)
            product.images.map((image, index) => {
              images.push(shapeToObject(image, imageUrls[index]))
            })
            products.push({
              ...product,
              images,
            })
          }
        })
      )
      return products
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