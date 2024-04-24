import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import Dog, { IDog } from "../models/Dog";
import { ICacheService } from "../utils/CacheService";

/**
 * Controller che gestisce l'aggiunta di un nuovo cane in custodia nel canile.
 *
 * @param cacheService Il servizio che gestisce la cache.
 */
class AddDogToCustodyController extends BaseController {
  private readonly cacheService: ICacheService;

  constructor(cacheService: ICacheService) {
    super();
    this.cacheService = cacheService;
  }

  protected async executeImpl(
    request: Request,
    response: Response
  ): Promise<void> {
    const { name, breed, age } = request.body as IDog;

    const dog = new Dog({ name, breed, age, status: "in-custody" });
    await Dog.create(dog);

    await this.cacheService.purge();

    return this.ok(response);
  }
}

export { AddDogToCustodyController };
