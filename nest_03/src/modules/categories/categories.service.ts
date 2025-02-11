import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}
  async getPosts(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: {
        posts: true,
      },
    });
    return category;
  }

  findOne(id: number) {
    return this.categoriesRepository.findOne({
      where: { id },
    });
  }
}
