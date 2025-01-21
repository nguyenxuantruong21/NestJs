import { Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
  ) {}
  create(createPhoneDto: any, user: User) {
    if (user) {
      createPhoneDto.user = user;
    }
    const phone = this.phoneRepository.create(createPhoneDto);
    return this.phoneRepository.save(phone);
  }

  async deleteByUserId(id: number) {
    return this.phoneRepository.delete({
      user: {
        id,
      },
    });
  }
}
