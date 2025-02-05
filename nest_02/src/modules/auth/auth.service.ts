import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userData: any) {
    const user = this.usersService.create(userData);
    if (user) {
      return this.signAndSaveTokens(user);
    }
    return null;
  }

  async signAndSaveTokens(user: any) {
    const payload = { email: user.email, sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '2h',
    });

    this.usersService.saveRefreshToken(refreshToken, user.id);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async verifyRefreshToken(refreshToken: string) {
    const decoded = this.jwtService.decode(refreshToken);
    if (decoded) {
      const user = await this.usersService.verifyRefreshToken(
        refreshToken,
        decoded.sub,
      );
      if (user) {
        return user;
      }
    }
    return false;
  }
}
