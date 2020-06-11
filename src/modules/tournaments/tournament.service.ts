import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { CreateTournamentDTO } from './dtos/CreateTournamentDTO';
import { StoreTournamentPlayersDTO } from './dtos/StoreTournamentPlayersDTO';
import { TournamentBracket } from './entities/tournament-bracket.entity';
import { GenerateBracketsDTO } from './dtos/GenerateBracketsDTO';
import { Bracket } from './models/Bracket';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,

    @InjectRepository(TournamentBracket)
    private readonly tournamentBracketRepository: Repository<TournamentBracket>,
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

  async storePlayers(storeTournamentPlayersDTO: StoreTournamentPlayersDTO): Promise<string[]> {
    const { tournamentId, players } = storeTournamentPlayersDTO;

    const partialEntities = players.map(player => {
      return {
        playerNickname: player,
        tournamentId,
        numPhase: 1,
      }
    });

    const entities = this.tournamentBracketRepository.create(partialEntities);

    await this.tournamentBracketRepository.save(entities);

    return players;
  }

  async generateBrackets({ phaseNumber, tournamentId }: GenerateBracketsDTO): Promise<Bracket[]> {
    const tournamentBracketsInPhase = await this.tournamentBracketRepository.find({
      where: {
        numPhase: phaseNumber,
        tournamentId,
      },
    });

    const players = tournamentBracketsInPhase.map(item => item.playerNickname);

    return this.buildBrackets(players);
  }

  private buildBrackets(players: string[]): Bracket[] {
    const numPlayers = players.length;
    const numBrackets = this.getBracketsQuantity(numPlayers);

    const minPlayersInBracket = this.getMinPlayersInBracket(numPlayers, numBrackets);

    let brackets = [];
    let playersAlocatedQuantity = 0;
    let playersCopy = Object.assign([], players);

    for (let i = 0; i < numBrackets; i++) {
      const bracket: Bracket = {
        groupNumber: i + 1,
        players: playersCopy.slice(0, minPlayersInBracket),
      };
      brackets.push(bracket);
      playersCopy = playersCopy.slice(minPlayersInBracket);
      playersAlocatedQuantity += minPlayersInBracket;
    }

    if (numPlayers - playersAlocatedQuantity > 0) {
      brackets = this.alocateRemainedPlayers(brackets, playersCopy);
    }

    return brackets;
  }

  private alocateRemainedPlayers(brackets: Bracket[], remainedPlayers: string[]) {
    let index = 1;
    while (remainedPlayers.length > 0) {
      const currentBracket = brackets.find(bracket => bracket.groupNumber === index);

      if (currentBracket.players.length >= 8) {
        throw new BadRequestException(`We can't generate brackets for this quantity of players.`);
      }
      currentBracket.players.push(remainedPlayers[0]);
      remainedPlayers = remainedPlayers.splice(0, 1);

      index = index + 1 > brackets.length ? 1 : index + 1;
    }

    return brackets;
  }

  private getMinPlayersInBracket(numPlayers: number, numBrackets :number): number {
    const quantity = numPlayers === 8 ? 8 : Math.floor(numPlayers / numBrackets);

    if (quantity < 5) {
      throw new BadRequestException(`We can't generate brackets for ${numPlayers} players.`);
    }
    return quantity
  }

  private getBracketsQuantity(numPlayers: number): number {
    if (numPlayers < 8) {
      throw new BadRequestException('You must have more than 8 players in tournament.');
    }

    return numPlayers == 8 ? 1 : Math.ceil(numPlayers / 8);
  }
}
