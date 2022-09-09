import { User } from '../../models/User';
import { client } from '../../services/prisma';

export class UpdateUserRepository {
  async update(data: User) {
    try {
      const user = await client.user.update({
        where: {
          email: data.email,
        },
        data: {
          ...data,
        },
        select: {
          id: true,
          email: true,
          birth_date: true,
          cpf: true,
          phone: true,
          role: true,
          type: true,
        },
      });

      return user;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
