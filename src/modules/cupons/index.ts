import express from 'express';
import { CreateCupomController, LoadAllCuponsController } from '../../controllers/cupons';

const cuponsModule = express.Router()

const createCupomController = new CreateCupomController()
const loadAllCuponsController = new LoadAllCuponsController()

cuponsModule.post('/cupons/create', createCupomController.handle)
cuponsModule.get('/cupons', loadAllCuponsController.handle)

export { cuponsModule };
