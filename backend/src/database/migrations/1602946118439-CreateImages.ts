import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602617828541 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'path',
          type: 'varchar',
        },
        {
          name: 'safe_city_id',
          type: 'interger',
        }
      ],

      foreignKeys: [
        {
          name: 'imageOrphanage',
          columnNames: ['safe_city_id'],
          referencedTableName: 'safe_city',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ]
    }));

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
