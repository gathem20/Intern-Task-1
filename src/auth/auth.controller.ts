import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signup } from './dto/dto-signup';
import { login } from './dto/dto-login';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('signup')
  createUser(@Body() signup: signup):Promise<{ token: string }> {
    return this.authservice.signup(signup);
  }

  @Get('login')
  getUser(@Body() login: login):Promise<{ token: string }> {
     return this.authservice.getUser(login);
  }
}
