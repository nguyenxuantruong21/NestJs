import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PhoneModule } from '../phone/phone.module';
import { PostModule } from '../post/post.module';
import { Phone } from '../phone/entities/phone.entity';
import { Post } from '../post/entities/post.entity';
import { ProfileModule } from '../profile/profile.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Phone, Post]),
    PhoneModule,
    PostModule,
    ProfileModule,
  ],
})
export class UsersModule {}
