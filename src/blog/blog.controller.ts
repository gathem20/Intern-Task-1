import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { BlogService } from './blog.service';
import { UserBlog } from './dto/blog.dto';
import { CreatePostDto } from './dto/create.post.dto';
import { updateDto } from 'src/user/dto/update.dto.user';
import { UpdatePostDto } from './dto/update.post';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('get-all-posts/:page')
  getAllPosts(@Param('page') page: number) {
    return this.blogService.findAllPosts(page);
  }

  @Get('get-post/:id')
  getPost(@Param('id') id: string) {
    return this.blogService.getPost(id);
  }

  @Get('get-user-posts/:id')
  getUserPosts(@Param('id') id: string) {
    return this.blogService.getPostsByUser(id);
  }
  @Post('get-one-post-by-user')
  getOnePost(@Body(new ValidationPipe()) dto: UserBlog) {
    return this.blogService.getOnePostByUser(dto);
  }

  @Post('create-post')
  createPost(@Body(new ValidationPipe()) dto: CreatePostDto) {
    return this.blogService.createPost(dto);
  }

  @Patch('update-post/:id')
  updatePost(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.blogService.updatePost(id, dto);
  }

  @Delete('delete-post/:id')
  deletePost(@Param('id') id: string) {
    return this.blogService.deletePost(id);
  }
}
