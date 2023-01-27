import express from 'express';

import { CreateProductController, DisableProductController, EnableProductController, FilterProductsController, LoadAllProductsController, LoadDisabledProductsController, LoadProductByIdController, UpdateProductController } from '../../controllers/products';

const productsModule = express.Router();

const createProductController = new CreateProductController()
const loadAllProductsController = new LoadAllProductsController()
const loadProductByIdController = new LoadProductByIdController()
const updateProductController = new UpdateProductController()
const disableProduct = new DisableProductController()
const loadDisabledProductsController = new LoadDisabledProductsController()
const filterProductsController = new FilterProductsController()
const enableProductController = new EnableProductController()

productsModule.post('/products/create', createProductController.handle)
productsModule.get('/products', loadAllProductsController.handle)
productsModule.get('/products/filter', filterProductsController.handle)
productsModule.get('/products/:id', loadProductByIdController.handle)
productsModule.post('/products/:id/update', updateProductController.handle)
productsModule.put('/products/:id/disable', disableProduct.handle)
productsModule.get('/disabled-products', loadDisabledProductsController.handle)
productsModule.put('/products/:id/enable', enableProductController.handle)

export { productsModule };
