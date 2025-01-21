import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { PhoneModule } from './modules/phone/phone.module';
import { Phone } from './modules/phone/entities/phone.entity';
import { PostModule } from './modules/post/post.module';
import { Post } from './modules/post/entities/post.entity';

const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Phone, Post],
      synchronize: isDev,
      logging: isDev,
    }),
    UsersModule,
    PhoneModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
