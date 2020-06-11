import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { Tournament } from './entities/tournament.entity';
import { CreateTournamentDTO } from './dtos/CreateTournamentDTO';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { StoreTournamentPlayersDTO } from './dtos/StoreTournamentPlayersDTO';
import { Bracket } from './models/Bracket';

@UseGuards(JwtAuthGuard)
@Controller('/tournaments')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) { }

  @Post('/create')
  async create(
    @Body() createTournamentDTO: CreateTournamentDTO
  ): Promise<Tournament> {
    return this.tournamentService.create(createTournamentDTO);
  }

  @Post('/players')
  async storePlayers(
    @Body() storeTournamentPlayersDTO: StoreTournamentPlayersDTO
  ): Promise<string[]> {
    return this.tournamentService.storePlayers(storeTournamentPlayersDTO);
  }

  @Get('/:id/phase/:numPhase/brackets')
  async generateBrackets(
    @Param('id') tournamentId: string,
    @Param('numPhase') phaseNumber: number,
  ): Promise<Bracket[]> {
    return this.tournamentService.generateBrackets({ tournamentId, phaseNumber });
  }
}
