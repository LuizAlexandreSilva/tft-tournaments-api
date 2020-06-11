import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTournamentBrackets1591906221897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'tournament_brackets',
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
              name: 'num_phase',
              type: 'integer',
            },
            {
              name: 'player_nickname',
              type: 'varchar',
            },
            {
              name: 'bracket_number',
              type: 'integer',
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
          foreignKeys: [
            {
              name: 'BracketTournament',
              referencedTableName: 'tournaments',
              referencedColumnNames: ['id'],
              columnNames: ['tournament_id'],
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
            }
          ]
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('tournament_brackets');
    }

}
