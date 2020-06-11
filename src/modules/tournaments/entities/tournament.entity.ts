import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TournamentOrganizer } from './tournament-organizer.entity';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('integer', { name: 'num_players' })
  numPlayers: number;

  @OneToMany(() => TournamentOrganizer, tournamentOrganizer => tournamentOrganizer.tournament, {
    cascade: ['insert'],
    eager: true,
  })
  tournamentOrganizers: TournamentOrganizer[];

  @Column({ name: 'first_place' })
  firstPlace: string;

  @Column({ name: 'second_place' })
  secondPlace: string;

  @Column({ name: 'third_place' })
  thirdPlace: string;

  @Column({ name: 'fourth_place' })
  fourthPlace: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
