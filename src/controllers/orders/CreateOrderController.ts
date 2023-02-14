import { Request, Response } from 'express';
import { CreateOrderRepository } from '../../repositories/orders/CreateOrderRepository';
import { sendKafkaMessage } from '../../utils/send-kafka-message';

interface CartItem {
  id: string;
  quantity: number;
}

export class CreateOrderController {
  async handle(request: Request, response: Response) {
    const body = request.body;
    const createOrderRepository = new CreateOrderRepository()
    const { user, address, items, invoice, order_number } = body
    
    const formattedItems: string[] = []
    items.map((item: CartItem) => {
      for (let i = 0; i < item.quantity; i++) {
        formattedItems.push(item.id)
      }
    })
    
    try {
      const order = await createOrderRepository.create({
        user, address, items: formattedItems, invoice, order_number
      })
      await sendKafkaMessage({
        fromEmail: 'eu@pedrodahmer.com.br',
        toEmail: 'pedro@quater.rs',
        producerId: 'domusapi',
        subject: 'Novo pedido no site DomusMea!',
        html: `
          <h1>Novo pedido no site!</h1> <br/><br/>

          <h2>Número do pedido: <strong>${order.order_number}</strong></h2> <br/><br/>

          <h2>Itens:</h2><br/>
          ${order.items.map(item => {
            `<p>${item}</p>`
          })} <br/><br/>

          <h2>Cliente:</h2><br/>
          <p>Nome: ${order.user.full_name}</p><br/>
          <p>Email: ${order.user.email}</p><br/>
          <p>Telefone: ${order.user.phone}</p><br/>

          <h2>Endereço:</h2><br/>
          <p>Rua: ${order.address.street}, ${order.address.number}</p><br/>
          <p>Complemento: ${order.address.apt}</p><br/>
          <p>Bairro: ${order.address.neighborhood}</p><br/>
          <p>Cep: ${order.address.cep}</p><br/>
          <p>Cidade: ${order.address.city}</p><br/>
          <p>Estado: ${order.address.state}</p><br/>

          <h2>Valor:</h2><br/>
          <p>R$ ${invoice.total/100}</p>
        `
      })
      response.status(200).json({ order });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}