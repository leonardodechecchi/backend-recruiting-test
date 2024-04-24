import { BaseApiService, SwaggerModel, SwaggerOptions } from "efesto";
import Dog from "../../../../models/Dog";
import { Types } from "mongoose";
import { ValidationChain, param } from "express-validator";
import { Middleware } from "express-validator/src/base";

// endpoint: /api/v1/dogs/:dogId/custody
class ReleaseDogFromCustody extends BaseApiService {
  constructor() {
    super(__filename);
  }

  swaggerModel: SwaggerModel = {
    modelName: "dogs",
  };

  _deleteValidation: (ValidationChain | Middleware)[] = [
    param("dogId").custom((value) => {
      return new Types.ObjectId(value as string);
    }),
  ];

  _deleteSwagger: SwaggerOptions = {
    operationId: "releaseDogFromCustody",
    summary: "Rimuove il cane dalla custodia",
    permission: ["delete", "Dog"],
    purgeKey: "`dogs`",
    responses: {
      200: "@Dog",
      401: {},
      404: {},
    },
  };

  async _delete(
    req: ReleaseDogFromCustodyTypes.DeleteRequest,
    res: ReleaseDogFromCustodyTypes.DeleteResponse
  ): Promise<ReleaseDogFromCustodyTypes.DeleteReturn> {
    const { dogId } = req.params;

    // check if the dog exists
    const dog = await Dog.findOne({ _id: dogId });
    if (!dog) {
      return res.sendStatus(404);
    }

    if (!req.ability.can("delete", dog)) {
      return res.sendStatus(401);
    }

    // remove dog from custody
    const deletedDog = await Dog.findOneAndDelete({ _id: dog._id });
    return res.status(200).json(deletedDog ?? undefined);
  }
}

export default ReleaseDogFromCustody;
