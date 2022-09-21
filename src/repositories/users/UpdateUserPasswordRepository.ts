import { client } from '../../services/prisma';

export class UpdateUserPasswordRepository {
  async update(password: string, email: string) {
    try {
      const user = await client.user.update({
        where: {
          email,
        },
        data: {
          password,
        },
        select: {
          id: true,
          email: true,
          full_name: true,
          role: true,
        },
      });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
