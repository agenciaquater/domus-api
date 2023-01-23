import { Request, Response } from 'express';
import { LoadDisabledProducts } from '../../repositories/products/LoadDisabledProducts';

export class LoadDisabledProductsController {
  async handle(request: Request, response: Response) {
    const loadDisabledProductsRepository = new LoadDisabledProducts()
    try {
      const products = await loadDisabledProductsRepository.load()
      response.status(200).json({ products });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}