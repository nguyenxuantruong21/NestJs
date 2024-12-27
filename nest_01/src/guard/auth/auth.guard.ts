import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

const apiKey =
  '3f405218ddc334ffc37f415ca00db1e885fe2ab1e330e3223a275b6213dae624';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKeyFromHeader = request.headers['x-api-key'];
    const status = this.validateApiKey(apiKeyFromHeader);
    if (!status) {
      throw new UnauthorizedException('Unauthorized');
    }
    return status;
  }

  private validateApiKey(apiKeyFromHeader: string): boolean {
    return apiKeyFromHeader === apiKey;
  }
}
