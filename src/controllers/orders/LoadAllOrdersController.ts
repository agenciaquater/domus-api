import { Request, Response } from 'express';
import { LoadAllOrdersRepository } from '../../repositories/orders/LoadAllOrdersRepository';

export class LoadAllOrdersController {
  async handle(request: Request, response: Response) {
    const loadAllOrdersRepository = new LoadAllOrdersRepository()
    try {
      const orders = await loadAllOrdersRepository.load()
      response.status(200).json({ orders });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}