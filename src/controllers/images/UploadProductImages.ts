import { Request, Response } from 'express';
import { MulterFile } from '../../@types/multer-file';
import s3 from '../../services/s3';
import sharp from '../../services/sharp';
import { generateRandomImageName } from '../../utils/generate-random-32-bytes';

export class UploadFilesController {
  async handle(request: Request, response: Response) {
    const images = request.files as MulterFile[];
    const imageNames = [] as string[];

    try {
      await Promise.all(
        images.map(async image => {
          const resizedImage = await sharp.resizeImage(image)
          const randomImageName = generateRandomImageName()
          const command = s3.createPutObjectCommand(
            image,
            resizedImage,
            randomImageName
          )
          await s3.send(command)
          imageNames.push(randomImageName)
        })
      )


      response.status(200).json({ message: 'upload successful!', files: imageNames });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}
