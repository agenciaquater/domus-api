import { client } from 'src/services/prisma';

export class DeleteAttendanceRepository {
  async delete(id: string) {
    try {
      const attendance = await client.attendance.delete({
        where: {
          id,
        },
      });
      return attendance;
    } catch (e) {
      throw new Error(e);
    }
  }
}
