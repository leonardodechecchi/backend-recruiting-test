import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { ICacheService } from "../utils/CacheService";
import Dog, { IDog } from "../models/Dog";

/**
 * Controller che gestisce la richiesta di ottenere la lista di tutti i cani presenti nel canile.
 * Prima di recuperare i dati dal repository vengono cercati i dati nella cache.
 *
 * @param cacheService Il servizio che gestisce la cache.
 */
class GetAllDogsController extends BaseController {
  private readonly cacheService: ICacheService;

  constructor(cacheService: ICacheService) {
    super();
    this.cacheService = cacheService;
  }

  protected async executeImpl(
    request: Request,
    response: Response
  ): Promise<void> {
    const key = request.originalUrl;
    const cachedData = await this.cacheService.get(key);

    if (cachedData) {
      return this.ok(response, JSON.parse(cachedData));
    }

    const dogs = await Dog.find();

    await this.cacheService.set(key, JSON.stringify(dogs));

    return this.ok<IDog[]>(response, dogs);
  }
}

export { GetAllDogsController };
