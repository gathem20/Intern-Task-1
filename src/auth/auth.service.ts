import { BadRequestException, Injectable, Response } from '@nestjs/common';
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
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existUser) {
      throw new BadRequestException('Email already in use');
    }
    try {
      const hashedPassword = await bcrypt.hash(signup.password, 10);
      const createUser = await this.prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          firstName: signup.firstName,
          lastName: signup.lastName,
        },
      });
      const token = this.jwt.sign({
        id: createUser.id,
      });


      return { token };
    } catch (error) {
      throw new BadRequestException('Email already in use');
    }
  }
  async getUser(login: loginDto, @Response({ passthrough: true }) response?) {
    const User = await this.prisma.user.findUnique({
      where: { email: login.email },
    });
    console.log(User);
    if (!User) {
      throw new BadRequestException('Email or password is incorrect');
    }
    const isPassword = await bcrypt.compare(login.password, User.password);

    if (!isPassword) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const token = this.jwt.sign({
      id: User.id,
    });

    response.setCookie('access_token', this.jwt.sign({ id: User.id }));
    return { token };
  }
}
