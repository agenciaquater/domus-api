import { CreateAttendanceRepository } from '@repositories/attendance/CreateAttendanceRepository';
import { Attendance } from '../../models/Attendance';

export class CreateAttendanceController {
  async execute(data: Attendance) {
    const createAttendanceRepository = new CreateAttendanceRepository();

    if (!data) {
      throw new Error('No attendance data was provided');
    }
    try {
      const attendance = await createAttendanceRepository.create(data);
      return attendance;
    } catch (e) {
      throw new Error(e);
    }
  }
}
