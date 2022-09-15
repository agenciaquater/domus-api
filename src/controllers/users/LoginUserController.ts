import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoadUserByEmailRepository } from '../../repositories/users/LoadUserByEmailRepository';

export class LoginUserController {
  async execute(email: string, password: string) {
    const loadUserByEmailRepository = new LoadUserByEmailRepository();

    if (!email || !password) {
      throw new Error('Missing params');
    }
    try {
      const user = await loadUserByEmailRepository.load(email);

      if (!user) {
        throw new Error('User not found');
      }

      const passwordsMatch = bcrypt.compareSync(password, user.password);

      if (!passwordsMatch) {
        throw new Error('Incorrect Password');
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        'bcrypt-token',
        {
          expiresIn: '2h',
        }
      );

      return {
        message: 'Login success',
        token: token,
        data: {
          email: user.email,
          role: user.role,
          id: user.id,
        },
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
