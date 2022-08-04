import { client } from '../../services/prisma';

export class ListUsersRepository {
  async index() {
    const users = await client.user.findMany({
      select: {
        birth_date: true,
        cpf: true,
        email: true,
        full_name: true,
        id: true,
        phone: true,
        role: true,
        addresses: true,
      },
    });

    return users;
  }
}
