import { Global, Module } from '@nestjs/common';
import { prismaService } from './prisma.service';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [prismaService],
  exports: [prismaService],
})
export class PrismaModule {}
