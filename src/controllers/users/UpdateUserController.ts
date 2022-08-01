import { UpdateUserRepository } from '@repositories/users/UpdateUserRepository';
import { User } from '../../models/User';

export class UpdateUserController {
  async execute(data: User) {
    const updateUserRepository = new UpdateUserRepository();

    if (!data) {
      throw new Error('No user data provided');
    }
    try {
      const user = updateUserRepository.update(data);
      return user;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
