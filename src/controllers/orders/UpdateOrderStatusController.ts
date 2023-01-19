import { Request, Response } from 'express';
import { UpdateOrderStatusRepository } from '../../repositories/orders/UpdateOrderStatusRepository';

export class UpdateOrderStatusController {
  async handle(request: Request, response: Response) {
    const { status } = request.body;
    const { id } = request.params
    const updateOrderStatusRepository = new UpdateOrderStatusRepository()
    try {
      const order = await updateOrderStatusRepository.update(id, status)
      response.status(200).json({ order });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}