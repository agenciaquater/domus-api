import express from 'express';

import { CreateProductController, LoadAllProductsController, LoadProductByIdController } from '../../controllers/products';

const productsModule = express.Router();

const createProductController = new CreateProductController()
const loadAllProductsController = new LoadAllProductsController()
const loadProductByIdController = new LoadProductByIdController

productsModule.post('/products/create', createProductController.handle)
productsModule.get('/products', loadAllProductsController.handle)
productsModule.get('/products/:id', loadProductByIdController.handle)

export { productsModule };
