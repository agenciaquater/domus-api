import express from 'express';

import { CreateCategoryController, LoadAllCategoriesController } from '../../controllers/categories';

const categoriesModule = express.Router();

const createCategoryController = new CreateCategoryController()
const loadAllCategoriesController = new LoadAllCategoriesController()

categoriesModule.post('/categories/create', createCategoryController.handle)
categoriesModule.get('/categories', loadAllCategoriesController.handle)

export { categoriesModule };
