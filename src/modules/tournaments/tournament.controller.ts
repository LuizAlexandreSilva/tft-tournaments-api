import { Controller, Get } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { Tournament } from './entities/tournament.entity';

@Controller('/tournaments')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) { }

  @Get()
  async index(): Promise<Tournament[]> {
    return this.tournamentService.findAll();
  }
}
