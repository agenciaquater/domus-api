import { Request, Response } from 'express';
import { LoadUserByIdRepository } from '../../repositories/users/LoadUserByIdRepository';
import { sendKafkaMessage } from '../../utils/send-kafka-message';

export class CreateCourseOrder {
  async handle(request: Request, response: Response) {
    const body = request.body;
    const loadUserByIdRepository = new LoadUserByIdRepository();
    const { userId, course_name } = body;

    try {
      const user = await loadUserByIdRepository.load(userId);

      await sendKafkaMessage({
        fromEmail: 'eu@pedrodahmer.com.br',
        toEmail: 'pedro@quater.rs',
        producerId: 'domusapi',
        subject: '[DOMUSMEA] - Novo pedido de compra de curso no site!',
        html: `
          <h1>Novo pedido de compra de curso no site!</h1> <br/>
          <h3>Dados do cliente:</h3> <br/>
          <p>Nome: ${user?.full_name}</p><br/>
          <p>Email: ${user?.email}</p><br/>
          <p>Telefone: ${user?.phone}</p><br/>
          <h3>Curso comprado: ${course_name}</h3> <br/>
        `,
      });
      response.status(200);
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  }
}
