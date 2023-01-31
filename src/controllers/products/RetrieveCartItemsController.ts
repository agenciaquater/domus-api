import { Product } from '@prisma/client';
import { Request, Response } from 'express';
import { client } from '../../services/prisma';

interface RequestUnit {
  id: string;
  quantity: number;
}

interface RetrieveCartItemsRequest {
  items: RequestUnit[]
}

interface CartItem {
  product: Product
  quantity: number;
  totalPrice: number
}

export class RetrieveCartItemsController {
  async handle(request: Request, response: Response) {
    const {items}: RetrieveCartItemsRequest = request.body;
    const cartItems: CartItem[] = [] 

    try {
      await Promise.all(
        items.map(async item => {
          const product = await client.product.findFirst({
            where: {
              id: item.id
            }
          })
          if (!product) {
            return
          }
          cartItems.push({
            product,
            quantity: item.quantity,
            totalPrice: item.quantity * (product.sale_price ?? product.price)
          })
        })
      )
      response.status(200).json({ message: 'ok', cartItems });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}