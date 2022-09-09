import { client } from '../../services/prisma';

export class LoadUserWithAddressRepository {
  async load(email: string) {
    try {
      const user = await client.user.findFirst({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          full_name: true,
          cpf: true,
          birth_date: true,
          phone: true,
          role: true,
          addresses: {
            select: {
              street: true,
              number: true,
              apt: true,
              neighborhood: true,
              city: true,
              state: true,
            },
          },
        },
      });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}
