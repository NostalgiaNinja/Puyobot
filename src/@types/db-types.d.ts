import Discord from 'discord.js';

export interface ServerRow {
  serverID: string;
  moderatorID: string;
  moderationChannel: string;
  mutedRoleID: Discord.RoleResolvable;
}