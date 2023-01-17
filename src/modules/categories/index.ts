import express from 'express';
import { CreateCategoryController } from '../../controllers/categories/CreateCategoryController';


const categoriesModule = express.Router();

const createCategoryController = new CreateCategoryController()

categoriesModule.post('/categories/create', createCategoryController.handle)

export { categoriesModule };
