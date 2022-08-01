import { client } from 'src/services/prisma';
import { User } from '../../models/User';

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
      console.log(createdUser);
      return createdUser;
    } catch (e) {
      throw new Error(e);
    }
  }
}
