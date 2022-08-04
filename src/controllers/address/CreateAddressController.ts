import { Address } from '../../models/Address';
import { CreateAddressRepository } from '../../repositories/addresses/CreateAddressRepository';

export class CreateAddressController {
  async execute(data: Address) {
    const createAddressRepository = new CreateAddressRepository();

    if (!data) {
      throw new Error('No address data was provided');
    }
    try {
      const address = await createAddressRepository.create(data);
      return address;
    } catch (e) {
      throw new Error(e);
    }
  }
}
