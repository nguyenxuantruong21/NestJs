import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly userService: UsersService,
  ) {}

  async create(createCourseDto: any) {
    const course = this.courseRepository.create(createCourseDto);
    return await this.courseRepository.save(course);
  }

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: number) {
    return this.courseRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCourseDto: any) {
    const course = await this.courseRepository.findOne({
      where: {
        id,
      },
    });
    if (!course) {
      throw new NotFoundException('Not Found Course');
    }
    await this.courseRepository.update(id, updateCourseDto);
    return await this.courseRepository.findOne({
      where: {
        id,
      },
    });
  }

  async addUserToCourse(body: any) {
    const { course_id, user_id } = body;

    const course = await this.courseRepository.findOne({
      where: { id: course_id },
      relations: ['users'],
    });

    if (!course) {
      throw new NotFoundException('Course Not Found');
    }

    const user = await this.userService.findUserById(user_id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (course.users.find((u) => u.id === user_id)) {
      throw new BadRequestException('User already enrolled in this course');
    }

    course.users.push(user);
    await this.courseRepository.save(course);

    return course;
  }

  async deleteUserFromCourse(body: any) {
    const { course_id, user_id } = body;

    // Tìm Course và load danh sách users liên quan
    const course = await this.courseRepository.findOne({
      where: { id: course_id },
      relations: { users: true },
    });

    if (!course) {
      throw new NotFoundException('Course Not Found');
    }

    // Tìm User
    const user = await this.userService.findUserById(user_id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    // Kiểm tra nếu user không nằm trong danh sách users của course
    const userIndex = course.users.findIndex((u) => u.id === user_id);
    if (userIndex === -1) {
      throw new BadRequestException('User is not enrolled in this course');
    }

    // Xóa user khỏi danh sách users của course
    course.users = course.users.filter((u) => u.id !== user_id);

    // Lưu lại thay đổi
    await this.courseRepository.save(course);

    return course;
  }
}
