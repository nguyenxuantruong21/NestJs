import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
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
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete()
  remove(@Headers('ids') ids: string) {
    const parsedIds = JSON.parse(ids);
    return this.usersService.remove(parsedIds);
  }
}
