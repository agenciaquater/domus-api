import { LoadUserByIdRepository } from '../../repositories/users/LoadUserByIdRepository';

export class LoadUserByIdController {
  async execute(id: string) {
    const loadUserByIdRepository = new LoadUserByIdRepository();

    if (!id) {
      throw new Error('No user id provided');
    }
    try {
      const user = await loadUserByIdRepository.load(id);
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}
