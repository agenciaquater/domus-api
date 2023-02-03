import { Request, Response } from 'express';
import { LoadCupomByLabelRepository } from '../../repositories/cupons/LoadCupomByLabelController';

export class LoadCupomByLabelController {
  async handle(request: Request, response: Response) {
    const { label } = request.params;
    const loadCupomByLabelController = new LoadCupomByLabelRepository()
    try {
      const cupom = await loadCupomByLabelController.load(label)
      response.status(200).json({ cupom });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}