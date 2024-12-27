import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class TransformerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const transformer = (item: User) => {
      return {
        uid: item.id,
        fullname: item.name,
        email: item.email,
        password: item.password,
        active: item.isActive ? 'Active' : 'InActive',
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    };
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map(transformer);
        }
        return transformer(data);
      }),
    );
  }
}
