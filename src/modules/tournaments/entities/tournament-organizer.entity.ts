import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import User from 'modules/users/entities/user.entity';
import { Tournament } from './tournament.entity';

@Entity('tournament_organizers')
export class TournamentOrganizer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tournament_id' })
  tournamentId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Tournament, tournament => tournament.id)
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @ManyToMany(() => User, user => user.id)
  user: User[];
}
