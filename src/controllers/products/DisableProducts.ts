import { Request, Response } from 'express';
import { client } from '../../services/prisma';

export class DisableProductController {
  async handle(request: Request, response: Response) {
    const {id} = request.params;

    try {
      const product = await client.product.update({
        where: {
          id
        },
        data: {
          disabledAt: new Date()
        }
      })
      response.status(200).json({ product });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}