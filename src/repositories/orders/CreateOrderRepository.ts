import { Order } from "../../models/Order";

export class CreateOrderRepository {
  async create(data: Order) {
    try {
      
    } catch (error) {
      throw new Error(error.message)
    }
  }
}