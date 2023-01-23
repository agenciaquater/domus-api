import { Product } from "../../models/Product";
import { client } from "../../services/prisma";

interface MatchArray {
  id: string
}

export class CreateProductRepository {
  async create(data: Product) {
    try {
      let matches: MatchArray[] = []
      data.matches.map(match => {
        matches.push({ id: match })
      })

      const product = await client.product.create({
        data: {
          color: data.color,
          description: data.description,
          grape: data.grape,
          harmonization: data.harmonization,
          name: data.name,
          price: data.price,
          recipient: data.recipient,
          scent: data.scent,
          store: data.store,
          volume: data.volume,
          sale_price: data.sale_price,
          images: data.images,
          category: {
            connect: {
              id: data.categoryId
            }
          },
          matches: {
            connect: matches
          }
        },
        select: {
          id: true,
          name: true,
          price: true,
          sale_price: true,
          volume: true,
          category: true,
          images: true
        }
      })

      return product
    } catch (error) {
      throw new Error(error.message)
    }
  }
}