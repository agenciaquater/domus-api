import { Address } from '../../models/Address';
import { UpdateAddressRepository } from '../../repositories/addresses/UpdateAddressRepository';

export class UpdateAddressController {
  async execute(data: Omit<Address, 'userId'>, id: string) {
    const updateAddressRepository = new UpdateAddressRepository();

    if (!data) {
      throw new Error('No address data was provided');
    }
    if (!id) {
      throw new Error('No address id was provided');
    }
    try {
      const address = updateAddressRepository.update(data, id);
      return address;
    } catch (e) {
      throw new Error(e);
    }
  }
}
