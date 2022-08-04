import { ListAttendanceByUserIdRepository } from '@repositories/attendance/ListAttendaceByUseIdRepository';

export class ListAttendanceByUserIdController {
  async execute(id: string) {
    const listAttendanceByUserIdRepository =
      new ListAttendanceByUserIdRepository();

    if (!id) {
      throw new Error('No user email was provided');
    }
    try {
      const attendances = await listAttendanceByUserIdRepository.index(id);
      return attendances;
    } catch (e) {
      throw new Error(e);
    }
  }
}
