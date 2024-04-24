import { BaseApiService, SwaggerModel, SwaggerOptions } from "efesto";
import Dog from "../../../models/Dog";
import { ValidationChain, body } from "express-validator";
import { Middleware } from "express-validator/src/base";

// endpoint: /api/v1/dogs/custody
class PutDogInCustody extends BaseApiService {
  constructor() {
    super(__filename);
  }

  swaggerModel: SwaggerModel = {
    modelName: "dogs",
    schemas: [
      {
        name: "DogRegistration",
        properties: {
          name: "string",
          breed: "string",
          age: "number",
        },
        noTimestamps: true,
      },
    ],
  };

  _postValidation: (ValidationChain | Middleware)[] = [
    body("name").isString().trim().notEmpty(),
    body("breed").isString().trim().notEmpty(),
    body("age").isInt({ min: 0 }),
  ];

  _postSwagger: SwaggerOptions = {
    operationId: "putDogInCustody",
    summary: "Aggiunge un cane in custodia",
    requestBody: "@DogRegistration",
    purgeKey: "`dogs`",
    responses: {
      "200": "@Dog",
    },
  };

  async _post(
    req: PutDogInCustodyTypes.PostRequest,
    res: PutDogInCustodyTypes.PostResponse
  ): Promise<PutDogInCustodyTypes.PostReturn> {
    const { name, breed, age } = req.body;
    const { user } = req;

    const dog = new Dog({
      name,
      breed,
      age,
      status: "in-custody",
      ownerId: user._id,
    });
    await Dog.create(dog);

    return res.status(200).json(dog);
  }
}

export default PutDogInCustody;
