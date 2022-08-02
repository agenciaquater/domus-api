import { client } from 'src/services/prisma';

export class DeleteAddressRepository {
  async delete(id: string) {
    try {
      const address = client.address.delete({
        where: {
          id,
        },
      });
      return address;
    } catch (e) {
      throw new Error(e);
    }
  }
}
