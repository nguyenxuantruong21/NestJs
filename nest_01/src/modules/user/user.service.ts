import { Injectable, Scope } from '@nestjs/common';
import DatabaseService from 'src/db/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as db from 'data/user.json';

@Injectable({ scope: Scope.DEFAULT })
export class UserService {
  constructor(private readonly dbService: DatabaseService) {
    console.log(`user service created`);
  }

  create(body: CreateUserDto) {
    return body;
  }

  findOne(id: number) {
    return db.find((user) => user.id === id);
  }

  update(body: UpdateUserDto) {
    return body;
  }

  findAll() {
    return this.dbService.query();
  }

  index() {
    const user = {
      name: 'long',
      age: 24,
    };
    return user;
  }
}
