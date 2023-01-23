import s3 from '../services/s3';

export const getS3ImageUrls = async (imageNames: string[]): Promise<string[]> => {
  let imageUrls: string[] = [];
  await Promise.all(
    imageNames.map(async imageName => {
      const imageUrl = await s3.getImageSignedUrl(imageName)
      imageUrls.push(imageUrl)
    })
  )
  return imageUrls
}