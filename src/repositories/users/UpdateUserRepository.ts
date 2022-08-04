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
      });

      return user;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
