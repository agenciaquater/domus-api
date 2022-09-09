import { client } from '../../services/prisma';

export class LoadCustomersRepository {
  async index() {
    const users = await client.user.findMany({
      where: {
        role: 'customer',
      },
      select: {
        birth_date: true,
        cpf: true,
        email: true,
        full_name: true,
        id: true,
        phone: true,
        role: true,
        Attendance: true,
      },
    });

    return users;
  }
}
