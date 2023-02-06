import express from 'express';
import { CreateCupomController, DeleteCupomController, LoadAllCuponsController, LoadCupomByLabelController } from '../../controllers/cupons';

const cuponsModule = express.Router()

const createCupomController = new CreateCupomController()
const loadAllCuponsController = new LoadAllCuponsController()
const loadCupomByLabelController = new LoadCupomByLabelController()
const deleteCupomController = new DeleteCupomController()

cuponsModule.post('/cupons/create', createCupomController.handle)
cuponsModule.get('/cupons', loadAllCuponsController.handle)
cuponsModule.get('/cupons/:label', loadCupomByLabelController.handle)
cuponsModule.delete('/cupons/:label/delete', deleteCupomController.handle)

export { cuponsModule };
