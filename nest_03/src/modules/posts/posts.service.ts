import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly categoriesService: CategoriesService,
  ) {}

  findAll() {
    return this.postsRepository.find({
      relations: {
        categories: true,
      },
    });
  }

  findOne(id: number) {
    return this.postsRepository.findOne({
      where: {
        id,
      },
      relations: {
        categories: true,
      },
    });
  }

  async create(body: any) {
    /* tách body làm 2 phần là danh mục vs nội dung bài post */
    const { categories, ...postFromBody } = body;
    /* tìm ra các categories có trong body */
    const categoriesList = await Promise.all(
      categories.map((id: number) => {
        return this.categoriesService.findOne(id);
      }),
    );
    /* tạo mới bài post cùng với categories instance */
    const post = this.postsRepository.create({
      ...postFromBody,
      categories: categoriesList,
    });
    /* lưu lại và trả ra bài post */
    await this.postsRepository.save(post);
    return post;
  }

  async update(id: number, body: any) {
    /* tách body làm 2 phần là danh mục vs nội dung bài post */
    const { categories, ...postFromBody } = body;
    /* tìm ra các categories có trong body */
    const categoriesList = await Promise.all(
      categories.map((id: number) => {
        return this.categoriesService.findOne(id);
      }),
    );
    /* tìm bài post */
    const post = await this.postsRepository.findOne({
      where: { id },
    });
    /* tạo ra updatePost mới gộp cả cái post từ database vs body gửi lên nếu có */
    const updatePost = {
      ...post,
      ...postFromBody,
    };
    /* thêm cateogories mới vào thay thế cho toàn bộ categories cũ */
    updatePost.categories = categoriesList;
    /* lưu lại */
    await this.postsRepository.save(updatePost);

    return this.postsRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    /* Xóa dữ liệu bảng trung gian */
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: {
        categories: true,
      },
    });
    /* gán tất cả categories là [] rồi lưu lại*/
    post.categories = [];
    await this.postsRepository.save(post);

    /* Xóa post theo id */
    await this.postsRepository.delete(id);
    return post;
  }
}
