import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log(`request ${request.url} ${request.method}`);
    // thoi gian bat dau request
    const startTime = Date.now();
    return next.handle().pipe(
      map((data) => {
        const endTime = Date.now();
        console.log(`Response time :::::::`, endTime - startTime);
        return data;
      }),
    );
  }
}
