import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { Tournament } from './entities/tournament.entity';
import { CreateTournamentDTO } from './dtos/CreateTournamentDTO';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('/tournaments')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) { }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(
    @Body() createTournamentDTO: CreateTournamentDTO
  ): Promise<Tournament> {
    return this.tournamentService.create(createTournamentDTO);
  }
}
