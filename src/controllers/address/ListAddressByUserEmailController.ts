import { ListAddressByUserEmailRepository } from '../../repositories/addresses/ListAddressesByUserEmailRepository';

export class ListAddressByUserEmailController {
  async execute(email: string) {
    const listAddressByUserEmailRepository =
      new ListAddressByUserEmailRepository();

    if (!email) {
      throw new Error('No email was provided');
    }
    try {
      const addresses = await listAddressByUserEmailRepository.index(email);
      return addresses;
    } catch (e) {
      throw new Error(e);
    }
  }
}
