import express from 'express';
import multer from 'multer';

import { DeleteFilesController, UploadFilesController } from '../../controllers/images';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadImagesController = new UploadFilesController()
const deleteImagesController = new DeleteFilesController()

const imagesModule = express.Router();

imagesModule.post('/media/images/upload', upload.array("images"), uploadImagesController.handle)
imagesModule.post('/media/images/delete', upload.array("images"), deleteImagesController.handle)

export { imagesModule };

