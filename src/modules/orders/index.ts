import express from 'express';
import { CreateOrderController, LoadAllOrdersController, LoadOrdersByUserController, UpdateOrderStatusController } from '../../controllers/orders';

const ordersModule = express.Router();

const createOrderController = new CreateOrderController()
const loadAllOrdersController = new LoadAllOrdersController()
const loadOrdersByUserController = new LoadOrdersByUserController()
const updateOrderStatusController = new UpdateOrderStatusController()

ordersModule.post('/orders/create', createOrderController.handle)
ordersModule.get('/orders', loadAllOrdersController.handle)
ordersModule.get('/orders/user/:id', loadOrdersByUserController.handle)
ordersModule.post('/orders/:id/update', updateOrderStatusController.handle)

export { ordersModule };

