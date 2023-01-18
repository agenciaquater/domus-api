import { client } from "src/services/prisma"

export class LoadCategoryByIdRepository {
  async load(id: string) {
    try {
      const category = await client.category.findFirst({
        where: {
          id
        },
        include: {
          child_category: true,
          parent_category: true,
          Product: true
        }
      })

      return category
    } catch (error) {
      throw new Error(error.message)
    }
  }
}