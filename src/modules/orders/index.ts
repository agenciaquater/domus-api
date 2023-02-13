import express from 'express';
import { CreateOrderController, DeleteOrderController, LoadAllOrdersController, LoadOrderByOrderNumberController, LoadOrdersByUserController, UpdateOrderStatusController } from '../../controllers/orders';

const ordersModule = express.Router();

const createOrderController = new CreateOrderController()
const loadAllOrdersController = new LoadAllOrdersController()
const loadOrdersByUserController = new LoadOrdersByUserController()
const updateOrderStatusController = new UpdateOrderStatusController()
const deleteOrderController = new DeleteOrderController()
const loadOrderByOrderNumberController = new LoadOrderByOrderNumberController()

ordersModule.post('/orders/create', createOrderController.handle)
ordersModule.get('/orders', loadAllOrdersController.handle)
ordersModule.get('/orders/user/:id', loadOrdersByUserController.handle)
ordersModule.post('/orders/:id/update', updateOrderStatusController.handle)
ordersModule.delete('/orders/:id/delete', deleteOrderController.handle)
ordersModule.get('/orders/:orderNumber', loadOrderByOrderNumberController.handle)

export { ordersModule };

