import bcrypt from 'bcrypt';
import { User } from '../../models/User';
import { client } from '../../services/prisma';

export class CreateUserRepository {
  async create(data: User) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(data.password, salt);

      const user = await client.user.create({
        data: {
          cpf: data.cpf as string,
          email: data.email,
          password: hashedPassword,
          full_name: data.full_name,
          type: data.type,
          role: data.role,
        },
        select: {
          email: true,
          id: true,
          full_name: true,
        },
      });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}
