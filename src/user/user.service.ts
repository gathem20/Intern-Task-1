import { Injectable, Res } from '@nestjs/common';
import { prismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: prismaService) {}
  async getUserName(@Res({ passthrough: true }) response?: Response) {
    return this.prisma.user.findMany();
  }
}
