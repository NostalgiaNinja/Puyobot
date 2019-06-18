import Discord from 'discord.js';

export interface Command {
  name: string;
  description: string;
  aliases: string[];
  category: string[];
  usage: string[];
  execute(message: Discord.Message, args: string[], client: Discord.Client): void;
}
