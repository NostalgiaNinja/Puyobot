export interface UserRefs {
  id: string;
  at: string;
  name: string;
}

export interface PlayerData {
  avatar: string;
  createdTimestamp: number;
  current_rating: number;
  id: string;
  match_history: object;
  tag: string;
}

export interface LeagueConfig {
  TO_role: UserRefs;
  organizers: UserRefs[];
  current_season: string;
}
