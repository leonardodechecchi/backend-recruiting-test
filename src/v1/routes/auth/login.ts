import { BaseApiService, SwaggerModel, SwaggerOptions } from "efesto";
import User from "../../../models/User";
import { AuthService } from "../../../services/AuthService";
import { Middleware } from "express-validator/src/base";
import { defineRulesFor } from "../../../userAbilities";
import { connectRedis, redisClient } from "../../../redisClient";

class Login extends BaseApiService {
  constructor() {
    super(__filename);
  }

  swaggerModel: SwaggerModel = {
    modelName: "auth",
  };

  _postOverrideAuth: Middleware = (req, res, next) => {
    next();
  };

  _postSwagger: SwaggerOptions = {
    operationId: "login",
    summary: "Effettua il login",
    requestBody: "@Registration",
    responses: {
      200: "@User",
      401: {},
    },
  };

  async _post(
    req: LoginTypes.PostRequest,
    res: LoginTypes.PostResponse
  ): Promise<LoginTypes.PostReturn> {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !AuthService.comparePasswords(password, user.password)) {
      return res.sendStatus(401);
    }

    // build rules
    const rules = defineRulesFor(user);

    // define the key
    const key = user._id.toString();

    await connectRedis();

    // save to redis
    redisClient.set(key, JSON.stringify(rules));

    const jwt = AuthService.signJWT({ email, userAbilitiesRedisKey: key });

    res.cookie("jwt", jwt, { httpOnly: true });

    return res.json(user);
  }
}

export default Login;
