import { Request, Response } from 'express';
import { LoadOrdersByUserRepository } from '../../repositories/orders/LoadOrdersByUserRepository';

export class LoadOrdersByUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const loadOrdersByUserRepository = new LoadOrdersByUserRepository()
    try {
      const orders = await loadOrdersByUserRepository.load(id)
      response.status(200).json({ orders });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}