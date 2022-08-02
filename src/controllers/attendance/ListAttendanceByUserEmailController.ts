import { ListAttendanceByUserEmailRepository } from '@repositories/attendance/ListAttendaceByUserEmailRepository';

export class ListAttendanceByUserEmailController {
  async execute(email: string) {
    const listAttendanceByUserEmailRepository =
      new ListAttendanceByUserEmailRepository();

    if (!email) {
      throw new Error('No user email was provided');
    }
    try {
      const attendances = await listAttendanceByUserEmailRepository.index(
        email
      );
      return attendances;
    } catch (e) {
      throw new Error(e);
    }
  }
}
