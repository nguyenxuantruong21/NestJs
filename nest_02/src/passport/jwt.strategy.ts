import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        'dca506627a3062765f514eefc3c09aa382a8473dff4a34bce3ea069849734d44',
    });
  }

  async validate(payload: any): Promise<any> {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
