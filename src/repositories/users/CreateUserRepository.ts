import { User } from '../../models/User';
import { client } from '../../services/prisma';

export class CreateUserRepository {
  async create(user: User) {
    try {
      const createdUser = await client.user.create({
        data: {
          cpf: user.cpf,
          email: user.email,
          password: user.password,
        },
        select: {
          email: true,
          id: true,
        },
      });
      return createdUser;
    } catch (e) {
      throw new Error(e);
    }
  }
}
