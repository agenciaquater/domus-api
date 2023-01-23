import express from 'express';
import multer from 'multer';

import { UploadFilesController } from '../../controllers/images';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadImagesController = new UploadFilesController()

const imagesModule = express.Router();

imagesModule.post('/media/images/upload', upload.array("images"), uploadImagesController.handle)

export { imagesModule };

