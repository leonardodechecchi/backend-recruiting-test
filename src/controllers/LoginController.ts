import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { IUserRepository } from '../repositories/UserRepository';
import { AuthService } from '../utils/AuthService';

class LoginController extends BaseController {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    super();

    this.userRepository = userRepository;
  }

  protected async executeImpl(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body;

    const user = await this.userRepository.getByEmail(email);

    if (!user || !AuthService.comparePasswords(password, user.password)) {
      return this.unauthorized(response, 'Credenziali errate');
    }

    const jwt = AuthService.signJWT({ email });

    return this.ok(response, { jwt });
  }
}

export { LoginController };
