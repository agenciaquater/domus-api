import { Request, Response } from 'express';
import { CreateCupomRepository } from '../../repositories/cupons/CreateCupomRepository';

interface ConnectArray {
  id: string
}

export class CreateCupomController {
  async handle(request: Request, response: Response) {
    const body = request.body;
    const createCupomRepository = new CreateCupomRepository()

    let categories: ConnectArray[] = [];
    let products: ConnectArray[] = [];
    
    body.categories.map((category: string) => {
      categories.push({
        id: category
      })
    })

    body.products.map((product: string) => {
      products.push({
        id: product
      })
    })

    try {
      const cupom = await createCupomRepository.create({
        label: body.label,
        products,
        categories,
        value: body.value,
        type: body.type,
        maxDiscountValue: body.maxDiscountValue,
        minPurchaseValue: body.minPurchaseValue,
        due_at: body.dueAt,
      })
      response.status(200).json({ cupom });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}