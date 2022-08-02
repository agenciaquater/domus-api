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
      });

      return attendances;
    } catch (e) {
      throw new Error(e);
    }
  }
}
