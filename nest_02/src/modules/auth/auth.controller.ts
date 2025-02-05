import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from 'src/guards/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/register')
  async register(@Body() userData: any) {
    return this.authService.register(userData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() request: any) {
    return this.authService.signAndSaveTokens(request.user);
  }

  @Post('/refresh-token')
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh Token Is Required');
    }
    const user = await this.authService.verifyRefreshToken(refreshToken);
    if (!user) {
      throw new BadRequestException('Refresh Token Is Invalid');
    }
    return this.authService.signAndSaveTokens(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async profile(@Req() request: any) {
    return request.user;
  }
}
