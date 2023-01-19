import { Request, Response } from 'express';
import { CreateOrderRepository } from '../../repositories/orders/CreateOrderRepository';

export class CreateOrderController {
  async handle(request: Request, response: Response) {
    const body = request.body;
    const createOrderRepository = new CreateOrderRepository()
    const { user, address, items, total_price, order_number } = body
    try {
      const order = await createOrderRepository.create({
        user, address, items, total_price, order_number
      })
      response.status(200).json({ order });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}