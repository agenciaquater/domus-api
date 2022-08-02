import { client } from 'src/services/prisma';
import { Attendance } from '../../models/Attendance';

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
