import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IUserRepository } from '../repositories/UserRepository';

class RegisterController extends BaseController {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    super();

    this.userRepository = userRepository;
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;

    await this.userRepository.insertOne({ email, password });

    return this.ok(response);
  }
}

export { RegisterController };
