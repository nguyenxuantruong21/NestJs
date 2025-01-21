import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return this.postsRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  async findByUserId(id: number): Promise<Post[]> {
    const posts = this.postsRepository.find({
      where: {
        user: {
          id: id,
        },
      },
      relations: {
        user: true,
      },
    });
    return posts;
  }

  async createPostByUser(id: number, postBody: Partial<Post>) {}

  async deleteByUserId(id: number) {
    return this.postsRepository.delete({
      user: {
        id,
      },
    });
  }
}
