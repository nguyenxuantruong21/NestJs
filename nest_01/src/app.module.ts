import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { RoleMiddleware } from './middlewares/role/role.middleware';

@Module({
  imports: [UserModule, ProductModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, RoleMiddleware).forRoutes(
      {
        path: '/users',
        method: RequestMethod.ALL,
      },
      {
        path: '/users/*',
        method: RequestMethod.ALL,
      },
    );
  }
}
