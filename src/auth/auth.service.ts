import {
  BadRequestException,
  Injectable,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { loginDto } from './dto/dto-login';
import { signupDto, updateRoleDto } from './dto/dto-signup';
import { prismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  getuserById(response: globalThis.Response) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private prisma: prismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(
    signup: signupDto,
    @Res({ passthrough: true }) response?: Response,
  ) {
    const email = signup.email;
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: email,
        username: signup.username,
      },
    });
    if (existUser) {
      throw new BadRequestException('Email already in use..!');
    }
    try {
      const hashedPassword = await bcrypt.hash(signup.password, 10);
      const createUser = await this.prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          username: signup.username,
          // bio: signup.bio,
        },
      });
      console.log(createUser);
      const token = this.jwt.sign({
        id: createUser.id,
      });
      response.cookie('access_token', this.jwt.sign({ id: createUser.id }), {
        httpOnly: true,
      });

      return { token };
    } catch (error) {
      throw new BadRequestException('Try Again..!');
    }
  }
  async getUser(
    login: loginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
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

      response.cookie('access_token', this.jwt.sign({ id: User.id }), {
        httpOnly: true,
      });
      return { token };
    } catch (error) {
      throw new BadRequestException('Try Again..!');
    }
  }

  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    return { success: true };
  }

  async updateRoleUser(id: number, role: Role, token: string) {
    const { id: userId } = this.jwt.decode(token) as { id: number };
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if ('Admin' !== token) {
      throw new UnauthorizedException(
        'You are not allowed to perform this action',
      );
    }

    if ('Admin' !== findUser.role) {
      throw new UnauthorizedException(
        'You are not allowed to perform this action',
      );
    }
    const updateUser = await this.prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role: role,
      },
    });
    // console.log(updateUser);
    const userFromToken = await this.prisma.user.findUnique({
      where: {
        id: updateUser.id,
      },
    });

    if (userFromToken.role !== role) {
      throw new BadRequestException('Role update failed');
    }

    return { token };
  }

  async deleteUser(id: number, token: string, role: Role) {
    // const { id: userId } = this.jwt.decode(token) as { id: number };
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if ('Admin' === findUser.role) {
      throw new UnauthorizedException(
        'You are not allowed to perform this action',
      );
    }
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    console.log(deleteUser);
    const userFromToken = await this.prisma.user.findUnique({
      where: {
        id: deleteUser.id,
      },
    });

    console.log(userFromToken);
    if (userFromToken) {
      throw new BadRequestException('User delete failed');
    }
    return { message: 'User deleted successfully' };
  }
}
