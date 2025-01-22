import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async createCommentByUser(id: number, commentBody: any) {
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new BadRequestException('User Not Found');
    }
    const comment = this.commentRepository.create({ ...commentBody, user });
    return await this.commentRepository.save(comment);
  }

  async updateCommentById(id: number, commentBody: any) {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
      },
    });
    if (!comment) {
      throw new BadRequestException('Comment Not Found');
    }
    await this.commentRepository.update(id, commentBody);
    return await this.commentRepository.findOne({
      where: {
        id,
      },
    });
  }

  async deleteCommentById(id: number) {
    const comment = await this.commentRepository.findOne({
      where: {
        id,
      },
    });
    if (!comment) {
      throw new BadRequestException('Comment Not Found');
    }
    await this.commentRepository.delete(id);
    return comment;
  }

  async deleteAllCommentByUserId(id: number) {
    return this.commentRepository.delete({
      user: {
        id,
      },
    });
  }
}
