import { Injectable, Res } from '@nestjs/common';
import { prismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: prismaService) {}

  async getuserById(@Res({ passthrough: true }) response: Response) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: 1,
      },
    });
    return user;
  }
}
