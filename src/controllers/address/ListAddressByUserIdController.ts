import { ListAddressByUserIdRepository } from '../../repositories/addresses/ListAddressesByUserIdRepository';

export class ListAddressByUserIdController {
  async execute(id: string) {
    const listAddressByUserIdRepository = new ListAddressByUserIdRepository();

    if (!id) {
      throw new Error('No email was provided');
    }
    try {
      const addresses = await listAddressByUserIdRepository.index(id);
      return addresses;
    } catch (e) {
      throw new Error(e);
    }
  }
}
