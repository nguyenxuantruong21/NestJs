import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import DatabaseService from 'src/db/database.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService],
  exports: [UserService],
})
export class UserModule {}
