import { Injectable, Res } from '@nestjs/common';
import { prismaService } from 'src/prisma/prisma.service';
import { updateProfileDto } from './dto/update.dto.user';

@Injectable()
export class UserService {
  constructor(private prisma: prismaService) {}

  async getProfileUser(@Res() response: Response, userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async updateProfileUser(
    @Res() response: Response,
    userId: number,
    dto: updateProfileDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: dto.email,
        password: dto.password,
        username: dto.username,
        bio: dto.bio,
      },
    });
  }
}
