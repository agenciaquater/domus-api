import { Request, Response } from 'express';
import { DeleteCupomRepository } from '../../repositories/cupons/DeleteCupomRepository';

export class DeleteCupomController {
  async handle(request: Request, response: Response) {
    const {id} = request.params;
    const deleteCupomRepository = new DeleteCupomRepository()
    try {
      const cupom = await deleteCupomRepository.delete(id)
      response.status(200).json({ cupom });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}