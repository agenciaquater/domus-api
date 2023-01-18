import { client } from "src/services/prisma"

export class DeleteCategoryRepository {
  async delete(categoryId: string) {
    try {
      const category = await client.category.delete({
        where: {
          id: categoryId
        }
      })
      return category
    } catch (error) {
      throw new Error(error.message)
    }
  }
}