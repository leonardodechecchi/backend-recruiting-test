import { BaseApiService, SwaggerModel, SwaggerOptions } from "efesto";
import Dog, { IDog } from "../../../models/Dog";
import { ValidationChain, body } from "express-validator";
import { Middleware } from "express-validator/src/base";

// endpoint: /api/v1/dogs
class Dogs extends BaseApiService {
  constructor() {
    super(__filename);
  }

  swaggerModel: SwaggerModel = {
    modelName: "dogs",
    schemas: [
      {
        name: "Dog",
        properties: {
          id: "string",
          name: "string",
          breed: "string",
          age: "number",
          status: "string",
        },
      },
    ],
  };

  _getSwagger: SwaggerOptions = {
    operationId: "getDogs",
    summary: "Restituisce la lista di tutti i cani presenti nel canile",
    cache: {
      key: "`dogs`",
    },
    responses: {
      200: "@Dog[]",
    },
  };

  async _get(
    req: DogsTypes.GetRequest,
    res: DogsTypes.GetResponse
  ): Promise<DogsTypes.GetReturn> {
    const dogs = await Dog.find();
    return res.json(dogs);
  }

  _postValidation: (ValidationChain | Middleware)[] | undefined = [
    body("name").isString().trim().notEmpty(),
    body("breed").isString().trim().notEmpty(),
    body("age").isInt({ min: 0 }),
  ];

  _postSwagger: SwaggerOptions = {
    operationId: "registerDog",
    summary: "Registra un cane nel canile",
    requestBody: "@DogRegistration",
    purgeKey: "`dogs`",
    responses: {
      200: "@Dog",
      400: {},
    },
  };

  async _post(
    req: DogsTypes.PostRequest,
    res: DogsTypes.PostResponse
  ): Promise<DogsTypes.PostReturn> {
    const { name, breed, age } = req.body;
    const { user } = req;

    const dog = await Dog.create(
      new Dog({ name, breed, age, status: "available", ownerId: user._id })
    );

    return res.json(dog);
  }
}

export default Dogs;