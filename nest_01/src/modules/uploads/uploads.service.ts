import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  async uploadFile() {
    return 'upload file';
  }
}
