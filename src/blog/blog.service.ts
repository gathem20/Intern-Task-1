import { BadRequestException, Injectable } from '@nestjs/common';
import { prismaService } from 'src/prisma/prisma.service';
import { UserBlog } from './dto/blog.dto';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post';
import { Role } from '@prisma/client';

@Injectable()
export class BlogService {
  constructor(private prisma: prismaService) {}

  async findAllPosts(page: string = '1', search: string = '') {
    try {
      const takePost = 10;
      const skipPost = (+page - 1) * takePost;
      const posts = await this.prisma.blog.findMany({
        where: {
          OR: [
            { title: { contains: search } },
            {
              content: { contains: search },
            },
          ],
        },
        include: {
          author: true,
        },
        take: takePost,
        skip: skipPost,
      });
      return posts;
    } catch (error) {
      throw new BadRequestException({ message: 'Posts not found' });
    }
  }

  async getPost(id: string) {
    try {
      const post = await this.prisma.blog.findUnique({
        where: {
          id: Number(id),
        },
      });
      return post;
    } catch (error) {
      throw new BadRequestException({ message: 'Post not found' });
    }
  }

  async getPostsByUser(id: string) {
    try {
      const post = await this.prisma.blog.findMany({
        where: {
          authorId: Number(id),
        },
      });
      return post;
    } catch (error) {
      throw new BadRequestException({ message: 'Posts not found' });
    }
  }

  async getOnePostByUser(dto: UserBlog) {
    try {
      const post = await this.prisma.blog.findUnique({
        where: {
          id: dto.id,
          authorId: dto.userId,
        },
      });
      return post;
    } catch (error) {
      throw new BadRequestException({ message: 'Post not found' });
    }
  }

  async createPost(dto: CreatePostDto) {
    try {
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
      return { message: 'Post created', post };
    } catch (error) {
      console.log({ message: 'Post not created' });
    }
  }
  async updatePost(id: string, dto: UpdatePostDto) {
    try {
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
    } catch (error) {
      throw new BadRequestException({ message: 'Post not found' });
    }
  }
  async deletePost(id: string) {
    try {
      const post = await this.prisma.blog.delete({
        where: {
          id: Number(id),
        },
      });
      return post;
    } catch (error) {
      throw new BadRequestException({ message: 'Post not found' });
    }
  }

  async deletePostByAdminOrEditor(id: string, role: Role) {
    const findBlog = await this.prisma.blog.findUnique({
      where:{
        id: Number(id)
      }, 
    })
      
  }
}
