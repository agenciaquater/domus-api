import { Request, Response } from 'express';
import { UpdateProductRepository } from '../../repositories/products/UpdateProductRepository';

export class UpdateProductController {
  async handle(request: Request, response: Response) {
    const body = request.body;
    const {id} = request.params
    const updateProductRepository = new UpdateProductRepository()

    try { 
      const product = await updateProductRepository.update(id, body)
      response.status(200).json({ product });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}