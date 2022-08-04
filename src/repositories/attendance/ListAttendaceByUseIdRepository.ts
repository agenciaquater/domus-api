import { client } from 'src/services/prisma';

export class ListAttendanceByUserIdRepository {
  async index(id: string) {
    try {
      const attendances = await client.attendance.findMany({
        where: {
          user: {
            id,
          },
        },
        select: {
          id: true,
          description: true,
          created_at: true,
          user: {
            select: {
              id: true,
              full_name: true,
              email: true,
            },
          },
        },
      });

      return attendances;
    } catch (e) {
      throw new Error(e);
    }
  }
}
