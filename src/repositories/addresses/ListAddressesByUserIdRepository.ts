import { client } from 'src/services/prisma';

export class ListAddressByUserIdRepository {
  async index(id: string) {
    try {
      const addresses = await client.address.findMany({
        where: {
          user: {
            id,
          },
        },
      });

      return addresses;
    } catch (e) {
      throw new Error(e);
    }
  }
}
