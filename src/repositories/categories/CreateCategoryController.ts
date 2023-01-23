import { Category } from "../../models/Category";
import { client } from "../../services/prisma";

export class CreateCategoryRepository {
  async create(data: Category) {
    try {
      if(!data.parent_category_id) {
        const category = await client.category.create({
          data: {
            name: data.name,
          },
          select: {
            id: true,
            name: true,
          }
        })

        return category
      }

      const category = await client.category.create({
        data: {
          name: data.name,
          parent_category: {
            connect: {
              id: data.parent_category_id
            }
          }
        }
      })

      return category
    } catch (error) {
      throw new Error(error.message)
    }
  }
}