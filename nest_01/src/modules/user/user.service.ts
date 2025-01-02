import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

const SALT_OR_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.delete(id);
    return user;
  }

  async createUser(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    const hashPassword = await bcrypt.hash(userData.password, SALT_OR_ROUNDS);
    user.password = hashPassword;
    return this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }
    const status = bcrypt.compareSync(password, user.password);
    if (status) {
      return user;
    }
    return null;
  }
}
