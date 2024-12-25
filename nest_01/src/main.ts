import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
// import { BadRequestException, ValidationPipe } from '@nestjs/common';
// import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     exceptionFactory: (error: ValidationError[]) => {
  //       return new BadRequestException(
  //         error.map((error) => {
  //           return {
  //             [error.property]: Object.values(error.constraints)[0],
  //           };
  //         }),
  //       );
  //     },
  //   }),
  // );

  app.use(new LoggerMiddleware().use);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
