import { ListUsersRepository } from '@repositories/users/ListUsersRepository';

export class ListUsersController {
  async execute() {
    const listUsersRepository = new ListUsersRepository();

    const users = await listUsersRepository.index();

    return users;
  }
}
