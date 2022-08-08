import { LoadUserByEmailRepository } from '@repositories/users/LoadUserByEmailRepository';
import bcrypt from 'bcrypt';
import jwtSign from 'jsonwebtoken';

export class LoginUserController {
  async execute(email: string, password: string) {
    const loadUserByEmailRepository = new LoadUserByEmailRepository();

    if (!email || !password) {
      throw new Error('Missing params');
    }
    try {
      const userAlreadyExists = await loadUserByEmailRepository.load(email);

      if (!userAlreadyExists) {
        throw new Error('User not found');
      }
      bcrypt.compare(password, userAlreadyExists.password, (err, res) => {
        if (err) {
          throw new Error('Cannot login');
        }
        if (res) {
          const token = jwtSign.sign(
            {
              id: userAlreadyExists.id,
              email: userAlreadyExists.email,
            },
            'bcrypt-token',
            {
              expiresIn: '1h',
            }
          );

          return {
            message: 'Login success',
            token: token,
            data: {
              email: userAlreadyExists.email,
              role: userAlreadyExists.role,
            },
          };
        }
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}
