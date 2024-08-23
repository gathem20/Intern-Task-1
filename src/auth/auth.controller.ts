import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from './dto/dto-signup';
import { loginDto } from './dto/dto-login';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('signup')
  createUser(@Body() dto: signupDto){
    return this.authservice.signup(dto);
  }

  @Get('login')
  getUser(@Body() dto: loginDto) {
     return this.authservice.getUser(dto);
  }
}
