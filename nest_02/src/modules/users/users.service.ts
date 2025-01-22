import { BadRequestException, Injectable } from '@nestjs/common';
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
import { PostService } from '../post/post.service';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class UsersService {
  // filter
  private filters = {
    posts: 'title',
    phone: 'phone',
  };
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly phoneService: PhoneService,
    private readonly postsService: PostService,
    private readonly profileService: ProfileService,
  ) {}

  async create(
    createUserDto: Partial<
      User & { phone: string; gender: string; photo: string }
    >,
  ) {
    const { phone, gender, photo, ...userData } = createUserDto;
    const profileData = { gender, photo };
    const newUser = this.usersRepository.create(userData);
    newUser.password = hashPassword(newUser.password);
    const userRes = await this.usersRepository.save(newUser);
    await this.phoneService.create({ phone }, userRes);
    await this.profileService.create(profileData, userRes);
    return userData;
  }

  async findAll(query: QueryFindAll) {
    const { q, _limit = 10, _order, _page = 1, _sort, include } = query;
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

    let relations = [];
    if (include) {
      relations = include.split(',');
    }

    return this.usersRepository.findAndCount({
      order: {
        [_sort]: _order,
      },
      take,
      skip,
      where,
      relations,
    });
  }

  async findOne(id: number, query: { include: string; [key: string]: string }) {
    const { include, ...rest } = query;
    let relations = [];
    if (include) {
      relations = include.split(',');
    }

    const filterRelations = {};
    Object.keys(rest).forEach((key) => {
      const relationName = key.replace('_query', '');
      filterRelations[relationName] = {
        [this.filters[relationName]]: Like(`%${rest[key]}%`),
      };
    });

    const user = await this.usersRepository.findOne({
      where: {
        id,
        ...filterRelations,
      },
      relations,
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    // return this.findOne(id);
  }

  async remove(ids: number[]) {
    const data = await this.usersRepository.delete({
      id: In(ids),
    });
    return data.affected;
  }

  async deleteUserId(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    // delete phone by user_id
    await this.phoneService.deleteByUserId(id);

    // delete post by user_id
    await this.postsService.deleteByUserId(id);

    // delete profile by user_id
    await this.profileService.deleteByUserId(id);

    // delete user
    await this.usersRepository.delete(id);

    return user;
  }
}
