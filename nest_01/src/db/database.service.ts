import { Injectable } from '@nestjs/common';

@Injectable()
export default class DatabaseService {
  query() {
    return `query ==> database service`;
  }
}
