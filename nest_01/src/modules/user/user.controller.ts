import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { UpdateValidationPipe } from 'src/validations/pipe';

@Injectable()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  create(@Body(ValidationPipe) body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(UpdateValidationPipe) body: UpdateUserDto,
  ) {
    return this.userService.update(body);
  }

  @Get()
  index() {
    return this.userService.index();
  }
}
