import { env } from "./Env";
import fs from "fs";
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import { MongoDb } from "./MongoDb";
import efesto from "efesto";
import { Middleware } from "express-validator/src/base";
import { AuthService, JwtPayload } from "../services/AuthService";
import User from "../models/User";
import { connectRedis, redisClient } from "../redisClient";
import { createMongoAbility } from "@casl/ability";

export const authMiddleware: Middleware = async (req, res, next) => {
  // check if the token has been provided
  const jwt = req.cookies ? req.cookies.jwt : null;
  if (!jwt) {
    return res.status(401).json({ message: "JWT not provided" });
  }

  let decodedToken: JwtPayload;

  try {
    // decode the jwt
    decodedToken = AuthService.verifyJWT(jwt);
  } catch (error) {
    // return an error if something went wrong
    return res.status(401).json({ message: "Invalid JWT" });
  }

  // find the user in the db and return an error if it does not exists
  const user = await User.findOne({ email: decodedToken.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // save user object into the request object
  req.user = user;

  await connectRedis();

  const result = await redisClient.get(decodedToken.userAbilitiesRedisKey);
  if (!result) {
    return res.status(401).json({ message: "Please login again" });
  }

  const rules = JSON.parse(result);

  req.ability = createMongoAbility(rules);

  return next();
};

export const errorMiddleware: Middleware = async (req, res, next) => {
  console.log("ciao");
  next();
};

interface BundleOptions {
  writePath?: string;
  writeStatic?: boolean;
}

export async function bundle(
  filePath: string,
  options: BundleOptions = { writeStatic: true }
) {
  return new Promise(async (resolve, reject) => {
    import("@apidevtools/swagger-parser").then(
      async ({ default: SwaggerParser }) => {
        const bundled = await SwaggerParser.bundle(filePath, {
          resolve: {
            file: { canRead: true },
            external: true,
            http: { canRead: true },
          },
        });

        try {
          const bundledJSON = JSON.stringify(bundled);
          fs.writeFileSync(
            options?.writePath || "swagger-declarations/apis.json",
            bundledJSON
          );
        } catch (error) {
          console.log(error);
          reject(error);
        }
        resolve(bundled);
      }
    );
  });
}

class Server {
  private readonly mongoDb: MongoDb;
  private readonly app: Express;

  constructor(mongoDb: MongoDb) {
    this.mongoDb = mongoDb;
    this.app = express();
  }

  private async init(): Promise<void> {
    bundle(__dirname + "../../../swagger-declarations/index.yaml");

    this.app.use(express.json());
    this.app.use(cookieParser());

    this.app.use(
      "/api/v1",
      efesto({
        options: {
          absoluteDirRoutes: `${__dirname}/../v1/routes`,
          relativeDirSwaggerDeclarationsPath: `swagger-declarations`,
          automaticTypesGenerationInlineFile: true,
          generatedTypesFolder: `${__dirname}/../v1/efesto-types`,
          config: {
            redis: {
              host: "127.0.0.1",
              port: 6379,
              defaultExpiresInSeconds: 10,
            },
            canMagicallyEditCode: true,
            abacPermissions: {
              actions: ["create", "read", "update", "delete"],
              models: ["User", "Dog"],
              checkPermissionBeforeResolver: true,
              reqAbilityField: "ability",
            },
          },
        },
        authMiddleware,
        errorMiddleware,
        isProduction: false,
      })
    );

    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(require("../../swagger-declarations/apis.json"), {
        swaggerOptions: {
          enableCors: false,
        },
      })
    );

    await this.mongoDb.connect();
  }

  public async listen(): Promise<void> {
    await this.init();

    this.app.listen(env.httpPort, () => {
      console.log(`Server listening on http://localhost:${env.httpPort}`);
      console.log(`Docs available at http://localhost:${env.httpPort}/docs`);
    });
  }

  // public getApp() {
  //   return this.app;
  // }
}

export { Server };
