import { DeleteAttendanceRepository } from '../../repositories/attendance/DeleteAttendanceRepository';

export class DeleteAttendanceController {
  async execute(id: string) {
    const deleteAttendanceRepository = new DeleteAttendanceRepository();

    if (!id) {
      throw new Error('No attendance id was provided');
    }
    try {
      const attendance = deleteAttendanceRepository.delete(id);
      return attendance;
    } catch (e) {
      throw new Error(e);
    }
  }
}
