import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { env } from "../utils/Env";

type JwtPayload = {
  email: string;
  userAbilitiesRedisKey: string;
};

class AuthService {
  constructor() {}

  public static comparePasswords(
    plainTextPassword: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return compare(plainTextPassword, encryptedPassword);
  }

  public static hashPassword(plainTextPassword: string): Promise<string> {
    return hash(plainTextPassword, 10);
  }

  public static signJWT(payload: JwtPayload): string {
    return sign(payload, env.jwtSecret, { expiresIn: 60 * 10 });
  }

  public static verifyJWT(jwt: any): JwtPayload {
    return verify(jwt, env.jwtSecret) as JwtPayload;
  }
}

export { JwtPayload, AuthService };
