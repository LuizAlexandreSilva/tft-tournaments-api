import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { CreateTournamentDTO } from './dtos/CreateTournamentDTO';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) { }

  async create(createTournamentDTO: CreateTournamentDTO): Promise<Tournament> {
    const { name, description, numPlayers, organizers } = createTournamentDTO;

    const tournament = this.tournamentRepository.create({
      name,
      description,
      numPlayers,
      tournamentOrganizers: organizers,
    });

    await this.tournamentRepository.save(tournament);

    return tournament;
  }
}
