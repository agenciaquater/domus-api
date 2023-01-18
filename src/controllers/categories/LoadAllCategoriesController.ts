import { Request, Response } from 'express';
import { LoadAllCategoriesRepository } from '../../repositories/categories/LoadAllCategoriesRepository';

export class LoadAllCategoriesController {
  async handle(request: Request, response: Response) {
    const loadAllCategoriesRepository = new LoadAllCategoriesRepository()
    try {
      const categories = await loadAllCategoriesRepository.load()
      response.status(200).json({ categories });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}