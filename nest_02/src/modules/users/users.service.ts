import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  Not,
  Repository,
} from 'typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/utils/hashing';
import { QueryFindAll } from './users.controller';
import { PhoneService } from '../phone/phone.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly phoneService: PhoneService,
  ) {}

  async create(createUserDto: Partial<User & { phone: string }>) {
    const { phone, ...userData } = createUserDto;
    const newUser = this.usersRepository.create(userData);
    newUser.password = hashPassword(newUser.password);
    const user = await this.usersRepository.save(newUser);
    const data = await this.phoneService.create({ phone }, user);
    return data;
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

  async findOne(id: number) {
    const user = await this.usersRepository.findOneOrFail({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        bio: true,
      },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(ids: number[]) {
    const data = await this.usersRepository.delete({
      id: In(ids),
    });
    return data.affected;
  }

  async getAllUser() {}
}
