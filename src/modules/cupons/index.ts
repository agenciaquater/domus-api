import express from 'express';
import { CreateCupomController } from '../../controllers/cupons';

const cuponsModule = express.Router()

const createCupomController = new CreateCupomController()

cuponsModule.post('/cupons/create', createCupomController.handle)

export { cuponsModule };
