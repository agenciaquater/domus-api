import { client } from 'src/services/prisma';

export class ListAttendanceByUserEmailRepository {
  async index(email: string) {
    try {
      const attendances = await client.attendance.findMany({
        where: {
          user: {
            email,
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
