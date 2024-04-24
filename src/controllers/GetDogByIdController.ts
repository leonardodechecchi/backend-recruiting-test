import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import Dog, { IDog } from "../models/Dog";
import { ObjectId } from "mongodb";

/**
 * Controller che gestisce la richiesta di ottenere un cane dal canile tramite il suo ID.
 *
 * @param dogRepository Il repository dei cani.
 */
class GetDogByIdController extends BaseController {
  protected async executeImpl(
    request: Request,
    response: Response
  ): Promise<void> {
    const dogId = new ObjectId(request.params.id);

    const dog = await Dog.findOne({ _id: dogId });
    if (!dog) {
      return this.notFound(response);
    }

    this.ok<IDog>(response, dog);
  }
}

export { GetDogByIdController };
