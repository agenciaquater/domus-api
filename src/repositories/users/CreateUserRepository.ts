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
          full_name: user.full_name,
        },
        select: {
          email: true,
          id: true,
          full_name: true,
        },
      });
      return createdUser;
    } catch (e) {
      throw new Error(e);
    }
  }
}
