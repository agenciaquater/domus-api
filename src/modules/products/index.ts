import express from 'express';

import { CreateProductController, LoadAllProductsController } from '../../controllers/products';

const productsModule = express.Router();

const createProductController = new CreateProductController()
const loadAllProductsController = new LoadAllProductsController()

productsModule.post('/products/create', createProductController.handle)
productsModule.get('/products', loadAllProductsController.handle)

export { productsModule };
