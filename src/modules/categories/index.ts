import express from 'express';

import { CreateCategoryController, LoadAllCategoriesController, LoadCategoryByIdController, LoadCategoryProductsController } from '../../controllers/categories';

const categoriesModule = express.Router();

const createCategoryController = new CreateCategoryController()
const loadAllCategoriesController = new LoadAllCategoriesController()
const loadCategoryProductsController = new LoadCategoryProductsController()
const loadCategoryByIdController = new LoadCategoryByIdController()

categoriesModule.post('/categories/create', createCategoryController.handle)
categoriesModule.get('/categories', loadAllCategoriesController.handle)
categoriesModule.get('/categories/:id/products', loadCategoryProductsController.handle)
categoriesModule.get('/categories/:id', loadCategoryByIdController.handle)

export { categoriesModule };
