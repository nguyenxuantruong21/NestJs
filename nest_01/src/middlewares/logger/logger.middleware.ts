import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: any) {
    const logger = new Logger('Request');
    logger.log(`Request :::: ${req.method} ::::: ${req.url}`);
    next();
  }
}
