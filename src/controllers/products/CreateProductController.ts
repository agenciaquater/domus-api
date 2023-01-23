import { Request, Response } from 'express';
import { CreateProductRepository } from '../../repositories/products/CreateProductRepository';


export class CreateProductController {
  async handle(request: Request, response: Response) {
    const body = request.body;
    const createProductsRepository = new CreateProductRepository()

    const {
      name,
      description,
      price,
      sale_price,
      reference,
      volume,
      recipient,
      store,
      grape,
      color,
      scent,
      harmonization,
      matchId,
      match,
      matches,
      category,
      images
    } = body

    try {
      const product = await createProductsRepository.create({
        name,
        description,
        price,
        sale_price,
        reference,
        volume,
        recipient,
        store,
        grape,
        color,
        scent,
        harmonization,
        matchId,
        match,
        matches,
        category,
        images
      })
      response.status(200).json({ product });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}''