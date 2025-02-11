import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePostsCategoriesTable1739256055642
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'posts_categories',
        columns: [
          {
            name: 'post_id',
            type: 'int',
          },
          {
            name: 'category_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts_categories');
  }
}
