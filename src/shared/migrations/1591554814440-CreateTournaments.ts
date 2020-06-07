import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTournaments1591554814440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tournaments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'num_players',
            type: 'integer',
          },
          {
            name: 'first_place',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'second_place',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'third_place',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'fourth_place',
            type: 'varchar',
            isNullable: true,
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
    await queryRunner.dropTable('tournaments');
  }
}
