import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { ObjectId } from "mongodb";
import Dog from "../models/Dog";

/**
 * Controller che gestisce l'adozione di un cane presente nel canile.
 *
 * @param cacheService Il servizio che gestisce la cache.
 */
class AdoptDogController extends BaseController {

  constructor() {
    super();
  }

  protected async executeImpl(
    request: Request,
    response: Response
  ): Promise<void> {
    const { user } = request;
    const dogId = new ObjectId(request.params.id);

    // check if the dog exists
    const dog = await Dog.findOne({ _id: dogId });
    if (!dog) {
      return this.notFound(response, "Dog not found");
    }

    // check if the dog has already been adopted
    if (dog.status === "adopted") {
      return this.unauthorized(response, "The dog has already been adopted");
    }

    // update the user's dogs list
    user.dogIds.push(dog._id);
    await user.save();

    // update the dog record
    await Dog.updateOne(
      { _id: dogId },
      { status: "adopted", adoptionDate: new Date() }
    );

    await this.cacheService.purge();

    return this.ok(response);
  }
}

export { AdoptDogController };
