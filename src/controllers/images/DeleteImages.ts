import { Request, Response } from 'express';
import s3 from '../../services/s3';

export class DeleteFilesController {
  async handle(request: Request, response: Response) {
    const { images } = request.body;

    try {
      await Promise.all(
        images.map(async (image: string) => {
          const command = s3.createDeleteObjectCommand(image);
          await s3.send(command);
        })
      );

      response.status(200).json({ message: 'Deletion successful!' });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}
