export interface UserRefs {
  ID: string;
  AT: string;
  NAME: string;
}

export interface ChannelRefs {
  ID: string;
  AT: string;
  NAME: string;
}

export interface PlayerData {
  ID: string;
  AVATAR: string;
  AT: string;
  TAG: string;
  USERNAME: string;
  CREATED_TIMESTAMP: number;
  CURRENT_RATING: number;
  MATCH_HISTORY: object;
}

export interface LeagueConfig {
  ORGANIZER_ROLE: UserRefs;
  ORGANIZERS: UserRefs[];
  CURRENT_SEASON: string;
  VERIFICATION_CHANNEL: ChannelRefs;
}
