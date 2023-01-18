import { Request, Response } from 'express';
import { DeleteCategoryRepository } from '../../repositories/categories/DeleteCategoryRepository';
import { LoadCategoryByIdRepository } from '../../repositories/categories/LoadCategoryByIdRepository';

export class DeleteCategoryController {
  async handle(request: Request, response: Response) {
    const {id} = request.params;
    const loadCategoryByIdRepository = new LoadCategoryByIdRepository()
    const deleteCategoryRepository = new DeleteCategoryRepository()

    try {
      const category = await loadCategoryByIdRepository.load(id)
      if (category) {
        if (category?.child_category) {
          await Promise.all(
            category?.child_category.map(async child => {
              await deleteCategoryRepository.delete(child.id)
            })
          )
        }
  
        await deleteCategoryRepository.delete(category.id)
        response.status(200).json({ category, deletedChildren: category.child_category });
      }
      response.status(400).json({message: 'Categoria não encontrada!'})
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}