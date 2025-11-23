import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeColumnUserTable1739435346218 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.changeColumn(
    //   'users',
    //   'name',
    //   new TableColumn({
    //     name: 'fullname',
    //     type: 'varchar(100)',
    //   }),
    // );
    await queryRunner.renameColumn('users', 'name', 'fullname');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.changeColumn(
    //   'users',
    //   'fullname',
    //   new TableColumn({
    //     name: 'name',
    //     type: 'varchar(50)',
    //   }),
    // );
    await queryRunner.renameColumn('users', 'fullname', 'name');
  }
}
