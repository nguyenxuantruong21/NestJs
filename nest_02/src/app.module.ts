import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { PostsModule } from './modules/posts/posts.module';
import { Phone } from './modules/users/entities/phone.entiry';
import { PhoneModule } from './modules/phone/phone.module';

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
      entities: [User, Phone],
      synchronize: isDev,
      logging: isDev,
    }),
    UsersModule,
    PostsModule,
    PhoneModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
