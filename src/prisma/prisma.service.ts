import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class prismaService extends PrismaClient {
  findUnique(arg0: { where: { id: number; }; }) {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
}






// constructor(
//   private config: ConfigService,
//   private prisma: PrismaClient,
// ) {
//   this.prisma = new PrismaClient({
//     datasources: {
//       db: {
//         url: this.config.get('DATABASE_URL'),
//       },
//     },
//   });
// }
