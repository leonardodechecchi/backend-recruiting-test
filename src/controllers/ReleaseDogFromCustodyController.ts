import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { ObjectId } from "mongodb";
import { ICacheService } from "../utils/CacheService";
import Dog from "../models/Dog";

/**
 * Controller che gestisce la richiesta di rilasciare un cane dalla custodia.
 *
 * @param cacheService Il servizio che gestisce la cache.
 */
class ReleaseDogFromCustodyController extends BaseController {
  private readonly cacheService: ICacheService;

  constructor(cacheService: ICacheService) {
    super();
    this.cacheService = cacheService;
  }

  protected async executeImpl(
    request: Request,
    response: Response
  ): Promise<void> {
    const dogId = new ObjectId(request.params.id);

    const dog = await Dog.findOne({ _id: dogId });
    if (!dog) {
      return this.notFound(response);
    }

    if (dog.status !== "in-custody") {
      return this.unauthorized(response);
    }

    await Dog.findOneAndDelete({ _id: dogId });

    await this.cacheService.purge();

    return this.ok(response);
  }
}

export { ReleaseDogFromCustodyController };
