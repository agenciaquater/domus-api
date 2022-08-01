import { client } from 'src/services/prisma';

export class ListUsersRepository {
  async index() {
    const users = await client.user.findMany();

    return users;
  }
}
