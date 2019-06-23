export interface UserRefs {
  id: string;
  at: string;
  name: string;
}

export interface ChannelRefs {
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
  ORGANIZER_ROLE: UserRefs;
  ORGANIZERS: UserRefs[];
  CURRENT_SEASON: string;
  VERIFICATION_CHANNEL: ChannelRefs;
}
