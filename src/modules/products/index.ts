import express from 'express';

import { CreateProductController } from '../../controllers/products';

const productsModule = express.Router();

const createProductController = new CreateProductController()

productsModule.post('/products/create', createProductController.handle)

export { productsModule };
