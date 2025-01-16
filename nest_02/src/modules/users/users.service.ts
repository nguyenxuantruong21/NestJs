import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/utils/hashing';
import { QueryFindAll } from './users.controller';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    newUser.password = hashPassword(newUser.password);
    return this.usersRepository.save(newUser);
  }

  async findAll(query: QueryFindAll) {
    const { q, _limit = 10, _order, _page = 1, _sort } = query;
    const take = _limit;
    const skip = (_page - 1) * take;
    const where = [];
    if (q) {
      where.push(
        {
          name: Like(`%${q}%`),
        },
        {},
      );
    }

    return this.usersRepository.findAndCount({
      order: {
        [_sort]: _order,
      },
      take,
      skip,
      where,
      relations: {
        phone: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(ids: number[]): Promise<void> {
    await this.usersRepository.delete({
      id: In(ids),
    });
  }
}
