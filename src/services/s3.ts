import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { MulterFile } from 'src/@types/multer-file';

dotenv.config()

const bucketName = process.env.BUCKET_NAME as string;
const bucketRegion = process.env.BUCKET_REGION as string;
const accessKey = process.env.BUCKET_ACCESS_KEY as string;
const secretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY as string;

const client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
})

const createPutObjectCommand = (file: MulterFile, body: Buffer, randomFileName?: string) => {
  const putObjectCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: randomFileName ?? file.originalname,
    Body: body,
    ContentType: file.mimetype,
  });

  return putObjectCommand
}

const send = async (command: PutObjectCommand) => {
  await client.send(command)
}

export default {
  bucketName,
  bucketRegion,
  accessKey,
  secretAccessKey,
  client,
  createPutObjectCommand,
  send
}