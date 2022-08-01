import { client } from 'src/services/prisma';

export class LoadUserByEmailRepository {
  async load(email: string) {
    const user = client.user.findFirst({
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
