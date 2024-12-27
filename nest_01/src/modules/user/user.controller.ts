import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Injectable } from '@nestjs/common';
import { TransformerInterceptor } from 'src/interceptor/transformer/transformer.interceptor';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { PermissionGuard } from 'src/guard/permission/permission.guard';

@Injectable()
@Controller('users')
@UseInterceptors(TransformerInterceptor)
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(+id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() body: any) {
    return await this.userService.update(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }

  @Post('')
  @UseGuards(PermissionGuard)
  async create(@Body() body: any) {
    return await this.userService.create(body);
  }
}
