import { Attendance } from '../../models/Attendance';
import { client } from '../../services/prisma';

export class CreateAttendanceRepository {
  async create(data: Attendance) {
    try {
      const attendance = await client.attendance.create({
        data: {
          ...data,
        },
        select: {
          description: true,
          created_at: true,
          userId: true,
        },
      });

      return attendance;
    } catch (e) {
      throw new Error(e);
    }
  }
}
