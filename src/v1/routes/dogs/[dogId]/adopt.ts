import { BaseApiService, SwaggerModel, SwaggerOptions } from "efesto";
import { Types } from "mongoose";
import Dog from "../../../../models/Dog";
import { ValidationChain, param } from "express-validator";
import { Middleware } from "express-validator/src/base";

// endpoint: /api/v1/:dogId/adopt
class AdoptDog extends BaseApiService {
  constructor() {
    super(__filename);
  }

  swaggerModel: SwaggerModel = {
    modelName: "dogs",
  };

  _putValidation: (ValidationChain | Middleware)[] | undefined = [
    param("dogId").custom((value) => {
      return new Types.ObjectId(value as string);
    }),
  ];

  _putSwagger: SwaggerOptions = {
    operationId: "adoptDog",
    summary: "Adotta un cane del canile con l'id specificato",
    purgeKey: "`dogs`",
    responses: {
      "200": "@Dog",
      "400": {},
      "401": {},
      "404": {},
    },
  };

  async _put(
    req: AdoptDogTypes.PutRequest,
    res: AdoptDogTypes.PutResponse
  ): Promise<AdoptDogTypes.PutReturn> {
    const { user } = req;
    const { dogId } = req.params;

    const dog = await Dog.findOne({ _id: dogId });
    if (!dog) {
      return res.sendStatus(404);
    }

    if (dog.status === "adopted") {
      return res.sendStatus(401);
    }

    user.dogIds.push(dog._id);
    await user.save();

    const updatedDog = await Dog.findOneAndUpdate(
      { _id: dog._id },
      { status: "adopted", adoptionDate: new Date() },
      { new: true }
    );

    return res.status(200).json(updatedDog ?? undefined);
  }
}

export default AdoptDog;
