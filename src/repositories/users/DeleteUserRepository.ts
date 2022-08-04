import { client } from '../../services/prisma';

export class DeleteUserRepository {
  async delete(email: string) {
    const user = client.user.delete({
      where: {
        email,
      },
      select: {
        email: true,
        id: true,
      },
    });

    return user;
  }
}
