import bcrypt from 'bcrypt';
import { User } from '../../models/User';
import { client } from '../../services/prisma';

export class CreateUserRepository {
  async create(user: User) {
    try {
      const createdUser = bcrypt.hash(
        user.password,
        10,
        async (err, encrypted) => {
          if (err) {
            throw new Error(err.message);
          }
          const userWithHashedPassword = await client.user.create({
            data: {
              cpf: user.cpf,
              email: user.email,
              password: encrypted,
              full_name: user.full_name,
            },
            select: {
              email: true,
              id: true,
              full_name: true,
            },
          });
          return userWithHashedPassword;
        }
      );

      return createdUser;
    } catch (e) {
      throw new Error(e);
    }
  }
}
