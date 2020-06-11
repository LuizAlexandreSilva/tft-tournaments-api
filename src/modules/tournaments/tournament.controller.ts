import { Controller, Post, Body } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { Tournament } from './entities/tournament.entity';
import { CreateTournamentDTO } from './dtos/CreateTournamentDTO';

@Controller('/tournaments')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) { }

  @Post('/create')
  async create(
    @Body() createTournamentDTO: CreateTournamentDTO
  ): Promise<Tournament> {
    return this.tournamentService.create(createTournamentDTO);
  }
}
