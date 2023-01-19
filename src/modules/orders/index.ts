import express from 'express';
import { CreateOrderController } from '../../controllers/orders/CreateOrderController';

const ordersModule = express.Router();

const createOrderController = new CreateOrderController()

ordersModule.post('/orders/create', createOrderController.handle)

export { ordersModule };

