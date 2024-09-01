import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto, updateRoleDto } from './dto/dto-signup';
import { loginDto } from './dto/dto-login';
import { Response, Request } from 'express';
import { Role } from '@prisma/client';

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

  @Patch('roles')
  updateRoleUser(
    @Body(new ValidationPipe()) body: updateRoleDto,
    @Req() req: Request,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    return this.authservice.updateRoleUser(body.id, body.role, token as any);
  }

  @Delete('delete-user/:id')
  deleteUser(@Param('id') id: number, @Req() req: Request, role: Role) {
    const token = req.headers.authorization.split(' ')[1];
    return this.authservice.deleteUser(id, role, token as any);
  }
}
