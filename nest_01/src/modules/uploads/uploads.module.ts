import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: process.cwd() + '/uploads',
      serveRoot: '/storage',
    }),
  ],
})
export class UploadsModule {}
