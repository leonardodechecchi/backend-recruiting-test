import { Request, Response } from 'express';
import { BaseController } from './BaseController';

class RegisterDogController extends BaseController {
  constructor() {
    super();
  }

  protected executeImpl(request: Request, response: Response): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { RegisterDogController };
