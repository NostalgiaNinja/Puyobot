import Discord from 'discord.js';
import { Command } from './bot';

declare module 'discord.js' {
  interface Client {
    commands: Discord.Collection<string, Command>;
  }
}
