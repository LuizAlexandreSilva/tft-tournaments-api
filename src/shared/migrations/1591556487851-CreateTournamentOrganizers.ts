import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTournamentOrganizers1591556487851
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tournament_organizers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'tournament_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'integer',
          },
        ],
        foreignKeys: [
          {
            name: 'OrganizerTournament',
            referencedTableName: 'tournaments',
            referencedColumnNames: ['id'],
            columnNames: ['tournament_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'TournamentOrganizer',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tournament_organizers');
  }
}
