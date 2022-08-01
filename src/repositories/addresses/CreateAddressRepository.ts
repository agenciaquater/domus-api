import { client } from 'src/services/prisma';
import { Address } from '../../models/Address';

export class CreateAddressRepository {
  async create(data: Address) {
    const address = await client.address.create({
      data: {
        ...data,
      },
      select: {
        id: true,
        street: true,
        number: true,
        neighborhood: true,
        user: {
          select: {
            email: true,
            id: true,
          },
        },
      },
    });

    return address;
  }
}
