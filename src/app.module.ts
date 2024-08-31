import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import { BlogModule } from './blog/blog.module';

import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    BlogModule,
    CommentsModule,
  ],
  controllers: [AppController, CommentsController],
  providers: [AppService , CommentsService],
})
export class AppModule {}
