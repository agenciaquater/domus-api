import { CreateUserRepository } from '@repositories/users/CreateUserRepository';
import { User } from '../../models/User';

export class CreateUserControler {
  async execute(data: User) {
    const createUserRepository = new CreateUserRepository();
    console.log('pedrao');
    try {
      const user = await createUserRepository.create(data);

      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}
