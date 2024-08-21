import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './comment-dto/comment-create-dto';
import { UpdateCommentDto } from './comment-dto/comment-update-dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('get-all-comments')
  async getAllComments() {
    return await this.commentService.getAllComments();
  }

  @Post('create-comment')
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.createComment(createCommentDto);
  }

  @Put('update-comment/:comment_id')
  async updateComment(
    @Param('comment_id') comment_id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.updateComment(
      comment_id,
      updateCommentDto,
    );
  }

  @Delete('delete-comment/:comment_id')
  async deleteComment(@Param('comment_id') comment_id: string) {
    return await this.commentService.deleteComment(comment_id);
  }

  @Get('get-comment/:comment_id')
  async getComment(@Param('comment_id') comment_id: string) {
    return await this.commentService.getComment(comment_id);
  }
}
