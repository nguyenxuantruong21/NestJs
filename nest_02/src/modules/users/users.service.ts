import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
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
import { comparePassword, hashPassword } from 'src/utils/hashing';
import { QueryFindAll } from './users.controller';
import { PhoneService } from '../phone/phone.service';
import { PostService } from '../post/post.service';
import { ProfileService } from '../profile/profile.service';
import { CommentService } from '../comment/comment.service';
import * as bcrypt from 'bcrypt';

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
    private readonly commentService: CommentService,
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

    // delete comment by user_id
    await this.commentService.deleteAllCommentByUserId(id);

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

  async findUserById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  findUserByEmail(email: string) {
    const user = this.usersRepository.findOneBy({ email });
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      return null;
    }
    const status = comparePassword(password, user.password);
    if (status) {
      return user;
    }
    return null;
  }

  async saveRefreshToken(refreshToken: string, userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const hasedRefreshToken = bcrypt.hashSync(refreshToken, 10);
    user.refresh_token = hasedRefreshToken;
    await this.usersRepository.save(user);
  }

  async verifyRefreshToken(refreshToken: string, useId: number) {
    const user = await this.usersRepository.findOneBy({ id: useId });
    if (user) {
      const status = bcrypt.compareSync(refreshToken, user.refresh_token);
      if (status) {
        return user;
      }
    }
    return false;
  }
}
