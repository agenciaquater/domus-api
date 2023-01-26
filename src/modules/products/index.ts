import express from 'express';

import { CreateProductController, DisableProductController, FilterProductsController, LoadAllProductsController, LoadDisabledProductsController, LoadProductByIdController, UpdateProductController } from '../../controllers/products';

const productsModule = express.Router();

const createProductController = new CreateProductController()
const loadAllProductsController = new LoadAllProductsController()
const loadProductByIdController = new LoadProductByIdController()
const updateProductController = new UpdateProductController()
const disableProduct = new DisableProductController()
const loadDisabledProductsController = new LoadDisabledProductsController()
const filterProductsController = new FilterProductsController()

productsModule.post('/products/create', createProductController.handle)
productsModule.get('/products', loadAllProductsController.handle)
productsModule.get('/products/filter', filterProductsController.handle)
productsModule.get('/products/:id', loadProductByIdController.handle)
productsModule.post('/products/:id/update', updateProductController.handle)
productsModule.put('/products/:id/disable', disableProduct.handle)
productsModule.get('/products/disabled', loadDisabledProductsController.handle)

export { productsModule };
