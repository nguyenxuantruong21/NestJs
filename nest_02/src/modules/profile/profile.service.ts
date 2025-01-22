import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  /* create profile from user */
  create(createProfileDto: any, user: User) {
    if (user) {
      createProfileDto.user = user;
    }
    const profile = this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(profile);
  }

  /* delete by user id */
  async deleteByUserId(id: number) {
    return this.profileRepository.delete({
      user: {
        id,
      },
    });
  }

  async updateByUserId(id: number, bodyUpdate: any) {
    const profile = await this.profileRepository.findOne({
      where: {
        user: {
          id,
        },
      },
    });
    if (!profile) {
      throw new BadRequestException('Not found profile');
    }
    await this.profileRepository.update(
      {
        user: {
          id,
        },
      },
      bodyUpdate,
    );
    return this.profileRepository.findOne({
      where: {
        user: {
          id,
        },
      },
    });
  }

  async deleteById(id: number) {
    const profile = await this.profileRepository.findOne({
      where: {
        id,
      },
    });
    await this.profileRepository.delete(id);
    return profile;
  }
}
