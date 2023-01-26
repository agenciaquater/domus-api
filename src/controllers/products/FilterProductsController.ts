import { Request, Response } from 'express';
import { FilterProductsRepository } from '../../repositories/products/FilterProductsRepository';

export class FilterProductsController {
  async handle(request: Request, response: Response) {
    const query = request.query;
    const filterProductsRepository = new FilterProductsRepository()

    try {
      const queryKeys = Object.keys(query)
      const key = queryKeys[0]
      const products = await filterProductsRepository.filter(key , query[key])
      response.status(200).json({ products });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}