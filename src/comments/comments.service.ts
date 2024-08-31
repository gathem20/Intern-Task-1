import { Injectable } from '@nestjs/common';
import { prismaService } from 'src/prisma/prisma.service';
import { commentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update.comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: prismaService) {}

  async getBlogComments(id: string) {
    const comments = await this.prisma.comment.findMany({
      where: {
        blogId: +id,
        replyId: null,
      },
      include: {
        replies: {
          include: {
            replies: { include: { replies: { include: { replies: true } } } },
          },
        },
      },
    });
    return comments;
  }

  async CreateComment(dto: commentDto, id: string) {
    const comment = await this.prisma.comment.create({
      data: {
        content: dto.content,
        blogId: +dto.blogId,
        userId: +dto.userId,
      },
    });
  }

  async deleteComment(id: string) {
    const comment = await this.prisma.comment.delete({
      where: {
        id: +id,
      },
    });
    return comment;
  }

  async updateComment(id: string, dto: UpdateCommentDto) {
    const comment = await this.prisma.comment.update({
      where: {
        id: +id,
      },
      data: {
        content: dto.content,
      },
    });
    return comment;
  }
  
}
