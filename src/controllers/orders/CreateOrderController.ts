import { Request, Response } from 'express';
import { CreateOrderRepository } from '../../repositories/orders/CreateOrderRepository';

interface CartItem {
  id: string;
  quantity: number;
}

export class CreateOrderController {
  async handle(request: Request, response: Response) {
    const body = request.body;
    const createOrderRepository = new CreateOrderRepository()
    const { user, address, items, invoice, order_number } = body
    
    const formattedItems: string[] = []
    items.map((item: CartItem) => {
      for (let i = 0; i < item.quantity; i++) {
        formattedItems.push(item.id)
      }
    })
    
    try {
      const order = await createOrderRepository.create({
        user, address, items: formattedItems, invoice, order_number
      })
      response.status(200).json({ order });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}