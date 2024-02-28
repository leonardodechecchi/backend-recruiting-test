import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { env } from './Env';

class AuthService {
  constructor() {}

  public static comparePasswords(
    plainTextPassword: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return compare(plainTextPassword, encryptedPassword);
  }

  public static signJWT(payload: any): string {
    return sign(payload, env.jwtSecret);
  }
}

export { AuthService };
