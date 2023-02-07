import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv';
import { MulterFile } from '../@types/multer-file';

dotenv.config()

const bucketName = process.env.S3_BUCKET_NAME as string;
const bucketRegion = process.env.S3_BUCKET_REGION as string;
const accessKey = process.env.S3_BUCKET_ACCESS_KEY as string;
const secretAccessKey = process.env.S3_BUCKET_SECRET_ACCESS_KEY as string;

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

const getImageSignedUrl = async (imageName: string): Promise<string> => {
  const getCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: imageName
  })
  const signedUrl = await getSignedUrl(client, getCommand, { expiresIn: 3600 })
  return signedUrl
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
  send,
  getImageSignedUrl
}