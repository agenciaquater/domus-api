import { Request, Response } from 'express';
import { LoadCategoryByIdRepository } from '../../repositories/categories/LoadCategoryByIdRepository';

export class LoadCategoryByIdController {
  async handle(request: Request, response: Response) {
    const {id} = request.params;
    const loadCategoryByIdRepository = new LoadCategoryByIdRepository()
    try {
      const category = await loadCategoryByIdRepository.load(id)
      response.status(200).json({ category });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}