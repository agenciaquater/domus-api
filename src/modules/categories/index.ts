import express from 'express';

import { CreateCategoryController, LoadAllCategoriesController, LoadCategoryProductsController } from '../../controllers/categories';

const categoriesModule = express.Router();

const createCategoryController = new CreateCategoryController()
const loadAllCategoriesController = new LoadAllCategoriesController()
const loadCategoryProductsController = new LoadCategoryProductsController()

categoriesModule.post('/categories/create', createCategoryController.handle)
categoriesModule.get('/categories', loadAllCategoriesController.handle)
categoriesModule.get('/categories/:id/products', loadCategoryProductsController.handle)

export { categoriesModule };
