import { LoadCustomersRepository } from '../../repositories/users/LoadCustomersRepository';

export class LoadCustomersController {
  async execute() {
    const loadCustomersRepository = new LoadCustomersRepository();

    const users = await loadCustomersRepository.index();

    return users;
  }
}
