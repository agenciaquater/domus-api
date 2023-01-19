import express from 'express';
import { CreateOrderController, LoadAllOrdersController, LoadOrdersByUserController } from '../../controllers/orders';

const ordersModule = express.Router();

const createOrderController = new CreateOrderController()
const loadAllOrdersController = new LoadAllOrdersController()
const loadOrdersByUserController = new LoadOrdersByUserController()

ordersModule.post('/orders/create', createOrderController.handle)
ordersModule.get('/orders', loadAllOrdersController.handle)
ordersModule.get('/orders/user/:id', loadOrdersByUserController.handle)

export { ordersModule };

