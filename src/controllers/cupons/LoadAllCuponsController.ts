import { Request, Response } from 'express';
import { LoadAllCuponsRepository } from '../../repositories/cupons/LoadAllCuponsRepository';

export class LoadAllCuponsController {
  async handle(request: Request, response: Response) {
    const loadAllCuponsRepository = new LoadAllCuponsRepository()

    try {
      const cupons = await loadAllCuponsRepository.load()
      response.status(200).json({ cupons });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}