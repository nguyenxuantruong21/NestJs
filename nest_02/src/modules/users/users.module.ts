import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PhoneModule } from '../phone/phone.module';
import { PostModule } from '../post/post.module';
import { Phone } from '../phone/entities/phone.entity';
import { Post } from '../post/entities/post.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Phone, Post]),
    PhoneModule,
    PostModule,
  ],
})
export class UsersModule {}
