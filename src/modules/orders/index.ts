import express from 'express';
import { CreateOrderController, LoadAllOrdersController } from '../../controllers/orders';

const ordersModule = express.Router();

const createOrderController = new CreateOrderController()
const loadAllOrdersController = new LoadAllOrdersController()

ordersModule.post('/orders/create', createOrderController.handle)
ordersModule.get('/orders', loadAllOrdersController.handle)

export { ordersModule };

