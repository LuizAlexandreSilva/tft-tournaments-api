import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TournamentBracket } from './entities/tournament-bracket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, TournamentBracket])
  ],
  providers: [TournamentService],
  controllers: [TournamentController],
})
export class TournamentModule { }
