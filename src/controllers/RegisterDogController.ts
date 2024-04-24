import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import Dog, { IDog } from "../models/Dog";
import { ICacheService } from "../utils/CacheService";

/**
 * Controller che gestisce la richiesta di registrare un nuovo cane nel canile.
 *
 * @param cacheService Il servizio che gestisce la cache.
 */
class RegisterDogController extends BaseController {
  private readonly dogCacheService: ICacheService;

  constructor(dogCacheService: ICacheService) {
    super();
    this.dogCacheService = dogCacheService;
  }

  protected async executeImpl(
    request: Request,
    response: Response
  ): Promise<void> {
    const { name, breed, age } = request.body as IDog;

    const dog = new Dog({ name, breed, age, status: "available" });
    await Dog.create(dog);

    await this.dogCacheService.purge();

    this.ok(response);
  }
}

export { RegisterDogController };
