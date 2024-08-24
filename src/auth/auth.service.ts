import { Injectable } from '@nestjs/common';
import { loginDto } from './dto/dto-login';
import { signupDto } from './dto/dto-signup';
import { prismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private prisma: prismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(signup: signupDto) {

      const email = signup.email;
      const hashedPassword = await bcrypt.hash(signup.password, 10);
      const createUser = await this.prisma.user.create({
        data: {
          email:email,
          password: hashedPassword,
          firstName: 'yousef',
          lastName: 'gathem',
        },
      });
      console.log(createUser.email)
      const token = this.jwt.sign({
        id: createUser.id,
      });
      const existingUser = await this.prisma.user.findUnique({
        where: { email: email },
      });
      
      
      if (existingUser) {
        throw new Error('Email already in use');
      }
      return { token };
      
  
  }
  getUser(login: loginDto) {
    throw new Error('Method not implemented.');
  }
}
