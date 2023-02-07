import { Product } from '@prisma/client';
import { Request, Response } from 'express';
import { Replace } from '../../helpers/replace';
import { client } from '../../services/prisma';
import { getS3ImageUrls } from "../../utils/get-s3-image-urls";

interface RequestUnit {
  id: string;
  quantity: number;
}

interface RetrieveCartItemsRequest {
  items: RequestUnit[]
}

interface CartItem {
  product: Replace<Product, {images: Image[]}>
  quantity: number;
  totalPrice: number
}

interface Image {
  name: string;
  url: string
}

export class RetrieveCartItemsController {
  async handle(request: Request, response: Response) {
    const {items}: RetrieveCartItemsRequest = request.body;
    const cartItems: CartItem[] = [] 

    try {
      await Promise.all(
        items.map(async item => {
          const product = await client.product.findFirst({
            where: {
              id: item.id
            },
            include: {
              category: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          })
          if (!product) {
            return
          }
          const imageUrls = await getS3ImageUrls(product.images)
          let images: Image[] = []
          product.images.map((image, index) => {
            images.push(shapeToObject(image, imageUrls[index]))
          })
          cartItems.push({
            product: {
              ...product,
              images,
            },
            quantity: item.quantity,
            totalPrice: item.quantity * (product.sale_price ?? product.price)
          })
        })
      )
      response.status(200).json({ message: 'ok', cartItems });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}

function shapeToObject(imageName: string, imageUrl: string) {
  return {
    name: imageName,
    url: imageUrl
  }
}