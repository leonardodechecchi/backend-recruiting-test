import 'dotenv/config';
import { CleanedEnvAccessors, cleanEnv, num, str } from 'envalid';

type Env = {
  NODE_ENV: string;
  DB_CONN_STRING: string;
  DB_NAME: string;
  HTTP_PORT: number;
  JWT_SECRET: string;
} & CleanedEnvAccessors;

class EnvUtil {
  private readonly env: Env;

  constructor() {
    this.env = cleanEnv(process.env, {
      NODE_ENV: str({ choices: ['development', 'production'] }),
      DB_CONN_STRING: str(),
      DB_NAME: str(),
      HTTP_PORT: num({ default: 3000 }),
      JWT_SECRET: str(),
    });
  }

  public get dbConnectionString(): string {
    return this.env.DB_CONN_STRING;
  }

  public get dbName(): string {
    return this.env.DB_NAME;
  }

  public get httpPort(): number {
    return this.env.HTTP_PORT;
  }

  public get jwtSecret(): string {
    return this.env.JWT_SECRET;
  }
}

const env = new EnvUtil();

export { env };
