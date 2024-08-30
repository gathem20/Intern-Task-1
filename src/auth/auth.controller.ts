import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from './dto/dto-signup';
import { loginDto } from './dto/dto-login';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('signup')
  createUser(
    @Body(new ValidationPipe()) dto: signupDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    return this.authservice.signup(dto, response);
  }

  @Post('login')
  getUser(
    @Body(new ValidationPipe()) dto: loginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    return this.authservice.getUser(dto, response);
  }

  @Delete('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authservice.logout(response);
  }
}
