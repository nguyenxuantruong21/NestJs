import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':id')
  createCommentByUser(@Param('id') id: number, @Body() commentBody: any) {
    return this.commentService.createCommentByUser(+id, commentBody);
  }

  @Patch('/update/:id')
  updateCommentById(@Param('id') id: number, @Body() commentBody: any) {
    return this.commentService.updateCommentById(+id, commentBody);
  }

  @Delete('/delete/:id')
  deleteCommentById(@Param('id') id: number) {
    return this.commentService.deleteCommentById(+id);
  }
}
