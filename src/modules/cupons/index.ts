import express from 'express';
import { CreateCupomController, LoadAllCuponsController, LoadCupomByLabelController } from '../../controllers/cupons';

const cuponsModule = express.Router()

const createCupomController = new CreateCupomController()
const loadAllCuponsController = new LoadAllCuponsController()
const loadCupomByLabelController = new LoadCupomByLabelController()

cuponsModule.post('/cupons/create', createCupomController.handle)
cuponsModule.get('/cupons', loadAllCuponsController.handle)
cuponsModule.get('/cupons/:label', loadCupomByLabelController.handle)

export { cuponsModule };
