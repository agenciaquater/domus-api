import { client } from 'src/services/prisma';

export class ListAddressByUserEmailRepository {
  async index(email: string) {
    try {
      const addresses = await client.address.findMany({
        where: {
          user: {
            email,
          },
        },
      });

      return addresses;
    } catch (e) {
      throw new Error(e);
    }
  }
}
