import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament])],
  providers: [TournamentService],
  controllers: [TournamentController],
})
export class TournamentModule { }