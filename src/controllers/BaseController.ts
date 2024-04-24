import { Request, Response } from "express";

/**
 * Classe astratta che rappresenta un controller di base per gestire le richieste HTTP.
 * Fornisce metodi di utilità comuni per gestire le risposte HTTP.
 * Le classi che estendono `BaseController` devono implementare il metodo `executeImpl` ovvero il corpo del controller.
 */
abstract class BaseController {
  constructor() {}

  protected abstract executeImpl(
    request: Request,
    response: Response
  ): Promise<void>;

  public async execute(request: Request, response: Response): Promise<void> {
    try {
      await this.executeImpl(request, response);
    } catch (error) {
      console.log(error);
      this.fail(response);
    }
  }

  private static errorRequest(
    response: Response,
    httpCode: 400 | 401 | 404 | 409 | 500,
    message: string
  ): void {
    response.status(httpCode).json({ httpCode, message });
  }

  protected ok<T>(response: Response, data?: T): void {
    if (!!data) {
      response.status(200).json(data);
    } else {
      response.sendStatus(200);
    }
  }

  protected badRequest(response: Response, message?: string): void {
    BaseController.errorRequest(response, 400, message ?? "Bad Request");
  }

  protected unauthorized(response: Response, message?: string): void {
    BaseController.errorRequest(response, 401, message ?? "Unauthorized");
  }

  protected notFound(response: Response, message?: string): void {
    BaseController.errorRequest(response, 404, message ?? "Not Found");
  }

  protected conflict(response: Response, message?: string): void {
    BaseController.errorRequest(response, 409, message ?? "Conflict");
  }

  protected fail(response: Response): void {
    BaseController.errorRequest(response, 500, "Internal Server Error");
  }
}

export { BaseController };
