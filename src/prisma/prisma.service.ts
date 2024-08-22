import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class prismaService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaClient,
  ) {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: this.config.get('DATABASE_URL'),
        },
      },
    });
  }
}
