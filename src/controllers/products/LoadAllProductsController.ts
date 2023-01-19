import { Request, Response } from 'express';
import { LoadAllProductsRepository } from '../../repositories/products/LoadAllProductsRepository';

export class LoadAllProductsController {
  async handle(request: Request, response: Response) {
    const loadAllProductsRepository = new LoadAllProductsRepository()
    try {
      const products = await loadAllProductsRepository.load()
      response.status(200).json({ products });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}