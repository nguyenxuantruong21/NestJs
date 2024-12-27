import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { Request } from 'express';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const newFileName = uuid();
          const ext = file.originalname.split('.').pop();
          const fileName = `${newFileName}.${ext}`;
          const allowed = ['image/png', 'image/jpg', 'image/jpeg'];
          if (!allowed.includes(file.mimetype)) {
            return callback(new BadRequestException('File Type Error'), null);
          }
          callback(null, fileName);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const origin = request.protocol + '://' + request.get('host');
    return {
      message: 'Upload file successfully !',
      data: {
        fileName: file.filename,
        fileUrl: origin + '/storage/' + file.filename,
      },
    };
  }
}
