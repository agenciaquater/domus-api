import bcrypt from 'bcrypt';
import { UpdateUserPasswordRepository } from '../../repositories/users/UpdateUserPasswordRepository';

export class UpdateUserPasswordController {
  async update(password: string, email: string) {
    const updateUserPasswordRepository = new UpdateUserPasswordRepository();

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
      const user = await updateUserPasswordRepository.update(
        hashedPassword,
        email
      );
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
