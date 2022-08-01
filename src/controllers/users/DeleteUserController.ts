import { DeleteUserRepository } from '@repositories/users/DeleteUserRepository';

export class DeleteUserController {
  async execute(email: string) {
    const deleteUserRepository = new DeleteUserRepository();

    if (!email) {
      return new Error('Email not provided');
    }
    try {
      const user = deleteUserRepository.delete(email);
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}
