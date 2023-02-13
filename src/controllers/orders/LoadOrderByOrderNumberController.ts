import { Request, Response } from 'express';
import { LoadOrderByOrderNumberRepository } from '../../repositories/orders/LoadOrderByOrderNumber';

export class LoadOrderByOrderNumberController {
  async handle(request: Request, response: Response) {
    const {orderNumber} = request.params;
    const loadOrderByOrderNumberRepository = new LoadOrderByOrderNumberRepository()
    try {
      const order = await loadOrderByOrderNumberRepository.load(orderNumber)
      response.status(200).json({ order });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}