import { client } from 'src/services/prisma';
import { Address } from '../../models/Address';

export class UpdateAddressRepository {
  async update(data: Omit<Address, 'userId'>, id: string) {
    try {
      const address = await client.address.update({
        where: {
          id,
        },
        data: {
          ...data,
        },
      });

      return address;
    } catch (e) {
      throw new Error(e);
    }
  }
}
