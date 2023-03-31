import express from 'express';
import { CreateCourseOrder } from '../../controllers/courses/create-course-order';

const coursesModule = express.Router();

const createCourseOrderController = new CreateCourseOrder();

coursesModule.post('/cupons/create', createCourseOrderController.handle);

export { coursesModule };
