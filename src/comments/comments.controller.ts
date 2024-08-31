import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { commentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update.comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('get-blog-comments/:id')
  getBlogComments(@Param('id') id: string) {
    return this.commentsService.getBlogComments(id);
  }

  @Post('create-blog-comment')
  createComment(@Body() dto: commentDto, @Param('id') id: string) {
    return this.commentsService.CreateComment(dto, id);
  }

  @Delete('delete-blog-comment/:id')
  deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id);
  }
  @Patch ('update-blog-comment/:id')
  updateComment(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return this.commentsService.updateComment(id, dto);
  }

}
