import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  index() {
    const user = {
      name: 'long',
      age: 24,
    };
    return user;
  }
}
