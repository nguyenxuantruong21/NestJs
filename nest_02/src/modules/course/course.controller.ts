import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: any) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add-student')
  async addUserToCourse(@Body() body: any) {
    return this.courseService.addUserToCourse(body);
  }

  @Delete('/delete-student')
  async deleteUserFromCourse(@Body() body: any) {
    return this.courseService.deleteUserFromCourse(body);
  }
}
