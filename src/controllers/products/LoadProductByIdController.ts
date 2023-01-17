import { LoadProductByIdRepository } from '@repositories/products/LoadProductByIdRepository';
import { Request, Response } from 'express';

export class LoadProductByIdController {
  async handle(request: Request, response: Response) {
    const {id} = request.params
    const loadProductByIdRepository = new LoadProductByIdRepository()
    try {
      const product = await loadProductByIdRepository.load(id)
      response.status(200).json({ product });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}