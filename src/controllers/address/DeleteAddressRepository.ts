import { DeleteAddressRepository } from '../../repositories/addresses/DeleteAddressRepository';

export class DeleteAddressController {
  async execute(id: string) {
    const deleteAddressRepository = new DeleteAddressRepository();

    if (!id) {
      throw new Error('No id was provided');
    }

    try {
      const address = await deleteAddressRepository.delete(id);
      return address;
    } catch (e) {
      throw new Error(e);
    }
  }
}
