import { Request, Response } from 'express';

abstract class BaseController {
  constructor() {}

  protected abstract executeImpl(request: Request, response: Response): Promise<void>;

  public async execute(request: Request, response: Response): Promise<void> {
    try {
      await this.executeImpl(request, response);
    } catch (error) {
      console.log(error);
      this.fail(response);
    }
  }

  protected ok<T>(response: Response, dto?: T): void {
    if (!!dto) {
      response.type('application/json');
      response.status(200).json(dto);
    } else {
      response.sendStatus(200);
    }
  }

  protected badRequest(response: Response, message?: string): void {
    response.status(400).json({ message: message ? message : 'Bad Request' });
  }

  protected unauthorized(response: Response, message?: string): void {
    response.status(401).json({ message: message ? message : 'Unauthorized' });
  }

  protected notFound(response: Response, message?: string): void {
    response.status(404).json({ message: message ? message : 'Not Found' });
  }

  protected fail(response: Response): void {
    response.status(500).json({ message: 'Internal Server Error' });
  }
}

export { BaseController };
