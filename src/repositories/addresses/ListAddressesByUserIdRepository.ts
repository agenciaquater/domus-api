import { client } from '../../services/prisma';

export class ListAddressByUserIdRepository {
  async index(id: string) {
    try {
      const addresses = await client.address.findMany({
        where: {
          user: {
            id,
          },
        },
        include: {
          user: true
        }
      });

      return addresses;
    } catch (e) {
      throw new Error(e);
    }
  }
}
