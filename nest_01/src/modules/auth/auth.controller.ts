import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from 'src/guard/local-auth/local-auth.guard';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  register(@Body() userData: any) {
    return this.userService.createUser(userData);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Req() request: Request) {
    return this.authService.login(request.user);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  profile(@Req() request: Request) {
    return request.user;
  }
}
