import express from 'express';

import { CreateProductController, LoadAllProductsController, LoadProductByIdController, UpdateProductController } from '../../controllers/products';

const productsModule = express.Router();

const createProductController = new CreateProductController()
const loadAllProductsController = new LoadAllProductsController()
const loadProductByIdController = new LoadProductByIdController()
const updateProductController = new UpdateProductController()

productsModule.post('/products/create', createProductController.handle)
productsModule.get('/products', loadAllProductsController.handle)
productsModule.get('/products/:id', loadProductByIdController.handle)
productsModule.post('/products/update/:id', updateProductController.handle)

export { productsModule };
