export class CreateTournamentDTO {
  name: string;
  description: string;
  numPlayers: number;

  organizers: OrganizerDTO[];
}

export class OrganizerDTO {
  userId: number;
}
