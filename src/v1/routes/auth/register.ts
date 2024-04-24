import { BaseApiService, SwaggerModel, SwaggerOptions } from "efesto";
import User from "../../../models/User";
import { AuthService } from "../../../services/AuthService";
import { Middleware } from "express-validator/src/base";

class Register extends BaseApiService {
  constructor() {
    super(__filename);
  }

  swaggerModel: SwaggerModel = {
    modelName: "auth",
    schemas: [
      {
        name: "Registration",
        properties: {
          email: "string",
          password: "string",
        },
        noTimestamps: true,
      },
    ],
  };

  _postOverrideAuth: Middleware = (req, res, next) => {
    next();
  };

  _postSwagger: SwaggerOptions = {
    operationId: "register",
    summary: "Effettua la registrazione di un utente",
    requestBody: "@Registration",
    responses: {
      200: "@User",
      409: {},
    },
  };

  async _post(
    req: RegisterTypes.PostRequest,
    res: RegisterTypes.PostResponse
  ): Promise<RegisterTypes.PostReturn> {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.sendStatus(409);
    }

    const hash = await AuthService.hashPassword(password);
    const newUser = await User.create(new User({ email, password: hash }));

    return res.status(200).json(newUser);
  }
}

export default Register;
