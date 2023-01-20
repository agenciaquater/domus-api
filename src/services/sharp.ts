import s from 'sharp';
import { MulterFile } from "src/@types/multer-file";

const sharpResizeOptions = {
  height: 452,
  width: 452,
};

const resizeImage = async (image: MulterFile) => {
  const resizedImage = await s(image.buffer)
    .resize(sharpResizeOptions)
    .toBuffer()
  return resizedImage
}

export default {
  sharpResizeOptions,
  resizeImage
};
