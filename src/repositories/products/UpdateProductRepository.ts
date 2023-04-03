import { client } from '../../services/prisma';

interface ConnectObject {
  id: string;
}

export class UpdateProductRepository {
  async update(id: string, data: any) {
    const newMatches: ConnectObject[] = [];
    const oldMatches: ConnectObject[] = [];

    data.matches.map((match: string) => {
      newMatches.push({
        id: match,
      });
    });

    data.oldMatches.map((match: string) => {
      oldMatches.push({
        id: match,
      });
    });

    try {
      const product = await client.product.update({
        where: {
          id: id,
        },
        data: {
          matches: {
            disconnect: oldMatches,
            connect: newMatches,
          },
          name: data.name,
          price: data.price,
          sale_price: data.sale_price,
          description: data.description,
          volume: data.volume,
          recipient: data.recipient,
          store: data.store,
          grape: data.grape,
          color: data.color,
          scent: data.scent,
          harmonization: data.harmonization,
          images: data.images,
          category: {
            connect: {
              id: data.categoryId,
            },
          },
        },
        include: {
          matches: true,
        },
      });

      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
