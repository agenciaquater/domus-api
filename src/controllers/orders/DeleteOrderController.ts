import { Request, Response } from 'express';
import { DeleteOrderRepository } from '../../repositories/orders/DeleteOrderRepository';

export class DeleteOrderController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const deleteOrderRepository = new DeleteOrderRepository()
    try {
      const order = await deleteOrderRepository.delete(id)
      response.status(200).json({ order });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}