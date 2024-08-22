import { Global, Module } from '@nestjs/common';
import { prismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [prismaService],
  exports: [prismaService],
})
export class PrismaModule {}
