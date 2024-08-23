import { Injectable } from '@nestjs/common';
import { login } from './dto/dto-login';
import { signup } from './dto/dto-signup';

@Injectable()
export class AuthService {
  signup(signup: signup): Promise<{ token: string }> {
    throw new Error('Method not implemented.');
  }
  getUser(login: login): Promise<{ token: string }> {
    throw new Error('Method not implemented.');
  }
  constructor() {}
}
