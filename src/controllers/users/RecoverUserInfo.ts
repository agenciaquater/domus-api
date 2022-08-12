import jwt from 'jsonwebtoken';

export class RecoverUserInfo {
  async handle(token: string) {
    try {
      const uncryptedData = jwt.verify(token, 'bcrypt-token');
      return uncryptedData;
    } catch (error) {
      throw new Error(error);
    }
  }
}
