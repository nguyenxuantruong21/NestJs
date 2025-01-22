import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PhoneModule } from '../phone/phone.module';
import { PostModule } from '../post/post.module';
import { Phone } from '../phone/entities/phone.entity';
import { Post } from '../post/entities/post.entity';
import { ProfileModule } from '../profile/profile.module';
import { CommentModule } from '../comment/comment.module';
import { Comment } from '../comment/entities/comment.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Phone, Post, Comment]),
    PhoneModule,
    PostModule,
    ProfileModule,
    forwardRef(() => CommentModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
