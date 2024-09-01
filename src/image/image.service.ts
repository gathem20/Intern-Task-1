import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';
import { prismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImagekitService {
  constructor(
    private imagekit: ImageKit,
    prisma: prismaService,
  ) {
    this.imagekit = new ImageKit({
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY,
      urlEndpoint: process.env.URL_ENDPOINT,
    });
  }
}
