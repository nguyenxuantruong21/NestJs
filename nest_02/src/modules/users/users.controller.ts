import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type QueryFindAll = {
  q: string;
  _sort: string;
  _order: string;
  _page: number;
  _limit: number;
  include: string;
};

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query()
    query: QueryFindAll,
  ) {
    const [user, count] = await this.usersService.findAll(query);
    return {
      total: count,
      current_page: +query._page ? +query._page : 1,
      data: user,
    };
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query() query: { include: string; [key: string]: string },
  ) {
    return this.usersService.findOne(+id, query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete()
  async remove(@Body() ids: number[]) {
    if (!(ids as any).ids.length) {
      throw new BadRequestException('Invalid Body');
    }
    const count = await this.usersService.remove((ids as any).ids);
    if (!count) {
      return {
        success: false,
      };
    }
    return {
      success: true,
      deleteCount: count,
    };
  }

  @Delete(':id')
  async deleteUserId(@Param('id') id: number) {
    return this.usersService.deleteUserId(id);
  }
}
