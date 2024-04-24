import { BaseApiService, SwaggerModel, SwaggerOptions } from "efesto";
import Dog from "../../../../models/Dog";
import { ValidationChain, param } from "express-validator";
import { Middleware } from "express-validator/src/base";
import { Types } from "mongoose";

// endpoint: /api/v1/dogs/:dogId
class DogId extends BaseApiService {
  constructor() {
    super(__filename);
  }

  swaggerModel: SwaggerModel = {
    modelName: "dogs",
  };

  _getValidation: (ValidationChain | Middleware)[] = [
    param("dogId").custom((value) => {
      return new Types.ObjectId(value as string);
    }),
  ];

  _getSwagger: SwaggerOptions = {
    operationId: "getDogByID",
    summary: "Restituisce il cane con l'id associato",
    responses: {
      200: "@Dog",
      404: {},
    },
  };

  async _get(
    req: DogIdTypes.GetRequest,
    res: DogIdTypes.GetResponse
  ): Promise<DogIdTypes.GetReturn> {
    const dog = await Dog.findOne({ _id: req.params.dogId });

    if (!dog) {
      return res.sendStatus(404);
    }

    return res.status(200).json(dog);
  }
}

export default DogId;
