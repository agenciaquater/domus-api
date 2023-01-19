import { client } from "../../services/prisma";

export class LoadAllCategoriesRepository {
  async load() {
    try {
      const categories = await client.category.findMany({
        include: {
          child_category: {
            include: {
              child_category: true
            }
          },
          parent_category: {
            include: {
              parent_category: true
            }
          }
        },
      })

      return categories
    } catch (error) {
      throw new Error(error.message)
    }
  }
}