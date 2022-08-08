import { client } from '../../services/prisma';

export class LoadUserByIdRepository {
  async load(id: string) {
    try {
      const user = await client.user.findFirst({
        where: {
          id,
        },
        select: {
          full_name: true,
          email: true,
          cpf: true,
          role: true,
          phone: true,
        },
      });

      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}
