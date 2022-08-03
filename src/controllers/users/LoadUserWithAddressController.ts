import { LoadUserWithAddressRepository } from '@repositories/users/LoadUserWithAddresRepository';

export class LoadUserWithAddressController {
  async execute(email: string) {
    const loadUserWithAddressRepository = new LoadUserWithAddressRepository();

    if (!email) {
      throw new Error('No user email provided');
    }
    try {
      const user = await loadUserWithAddressRepository.load(email);
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}
