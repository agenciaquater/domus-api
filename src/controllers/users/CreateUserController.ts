import { CreateUserRepository } from '@repositories/users/CreateUserRepository';
import { LoadUserByEmailRepository } from '@repositories/users/LoadUserByEmailRepository';
import { User } from '../../models/User';

export class CreateUserControler {
  async execute(data: User) {
    const createUserRepository = new CreateUserRepository();
    const loadUserByEmailRepository = new LoadUserByEmailRepository();

    const userAlreadyExists = loadUserByEmailRepository.load(data.email);
    if (!!userAlreadyExists) {
      throw new Error('User already exists');
    }
    try {
      const user = await createUserRepository.create(data);

      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}
