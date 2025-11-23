import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class CreateIndexPhoneTable1739436700341 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'phones',
      new TableIndex({
        name: 'phones_phone_index',
        columnNames: ['phone'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('phones', 'phones_phone_index');
  }
}
