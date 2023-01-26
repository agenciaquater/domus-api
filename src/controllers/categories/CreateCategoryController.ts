import { Request, Response } from 'express';
import { CreateCategoryRepository } from '../../repositories/categories/CreateCategoryController';
import { client } from '../../services/prisma';

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const body = request.body;
    const createCategoryRepository = new CreateCategoryRepository()
    const { name, parent_category_id } = body

    try {
      const categoryAlreadyExists = await client.category.findFirst({
        where: {
          name
        }
      })
      if (categoryAlreadyExists) {
        response.status(400).json({ message: 'A category with this name already exists!!' });
      }
      const category = await createCategoryRepository.create({
        name,
        parent_category_id,
      })

      response.status(200).json({ category });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}