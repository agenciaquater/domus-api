import { Request, Response } from 'express';
import { LoadCategoryProductsRepository } from '../../repositories/categories/LoadCategoryProductsRepository';

export class LoadCategoryProductsController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const loadCategoryProductsRepository = new LoadCategoryProductsRepository()
    try {
      const products = await loadCategoryProductsRepository.load(id)
      response.status(200).json({ products });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}