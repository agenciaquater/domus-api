import { Product } from '@prisma/client';
import { client } from '../../services/prisma';
import { getS3ImageUrls } from '../../utils/get-s3-image-urls';

interface Image {
  name: string;
  url: string;
}

interface ModifiedProduct extends Omit<Product, 'images'> {
  images: Image[];
}

export class LoadAllProductsRepository {
  async load() {
    try {
      const prismaProducts = await client.product.findMany({
        include: {
          category: true,
          matches: true,
        },
      });
      if (!prismaProducts) {
        return null;
      }
      let products: ModifiedProduct[] = [];
      await Promise.all(
        prismaProducts.map(async (product) => {
          let images: Image[] = [];
          if (product.disabledAt === null || product.disabledAt === undefined) {
            const imageUrls = await getS3ImageUrls(product.images);
            product.images.map((image, index) => {
              images.push(shapeToObject(image, imageUrls[index]));
            });
            products.push({
              ...product,
              images,
            });
          }
        })
      );
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

function shapeToObject(imageName: string, imageUrl: string) {
  return {
    name: imageName,
    url: imageUrl,
  };
}
