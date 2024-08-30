import { Injectable } from '@nestjs/common';
import { prismaService } from 'src/prisma/prisma.service';
import { UserBlog } from './dto/blog.dto';
import { CreatePostDto } from './dto/create.post.dto';
import { updateDto } from 'src/user/dto/update.dto.user';
import { UpdatePostDto } from './dto/update.post';

@Injectable()
export class BlogService {
  constructor(private prisma: prismaService) {}

  async findAllPosts(page: number) {
    const takePost = 10;
    const skipPost = (page - 1) * takePost;
    const posts = await this.prisma.blog.findMany({
      include: {
        author: true,
      },
      take: takePost,
      skip: skipPost,
    });
    return posts;
  }

  async getPost(id: string) {
    const post = await this.prisma.blog.findUnique({
      where: {
        id: Number(id),
      },
    });
    return post;
  }

  async getPostsByUser(id: string) {
    const post = await this.prisma.blog.findMany({
      where: {
        authorId: Number(id),
      },
    });
    return post;
  }

  async getOnePostByUser(dto: UserBlog) {
    const post = await this.prisma.blog.findUnique({
      where: {
        id: dto.id,
        authorId: dto.userId,
      },
    });
    return post;
  }

  async createPost(dto: CreatePostDto) {
    const post = await this.prisma.blog.create({
      data: {
        title: dto.title,
        content: dto.content,
        author: {
          connect: {
            id: dto.userId,
          },
        },
      },
    });
    return post;
  }
  async updatePost(id: string, dto: UpdatePostDto) {
    const post = await this.prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: {
        title: dto.title,
        content: dto.content,
      },
    });
    return post;
  }
  async deletePost(id: string) {
    const post = await this.prisma.blog.delete({
      where: {
        id: Number(id),
      },
    });
    return post;
  }
}
