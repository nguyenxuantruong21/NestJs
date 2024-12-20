import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
