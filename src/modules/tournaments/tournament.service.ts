import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) { }

  async findAll(): Promise<Tournament[]> {
    const tournament = this.tournamentRepository.create({
      name: 'Thornmail Tactics',
      numPlayers: 44,
    });

    const t = await this.tournamentRepository.save(tournament);
    return [t];
  }
}
