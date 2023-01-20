import express from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const imagesModule = express.Router();

imagesModule.post('/products/:id/images', upload.array("images"))

export { imagesModule };

