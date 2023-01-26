import { Request, Response } from 'express';
import { client } from 'src/services/prisma';
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
      categoryId,
      images
    } = body

    try {
      const productExists = await client.product.findFirst({
        where: {
          name,
        }
      })

      if (productExists) {
        response.status(400).json({message: 'A product with this name already exists!'})
      }

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
        categoryId,
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