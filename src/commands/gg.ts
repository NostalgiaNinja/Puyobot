import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';
import { Command } from '../@types/bot';

const ggCommands = new Discord.Collection();

const commandFiles = fs.readdirSync(path.resolve(__dirname, './gg/')).filter((file: string): boolean => /(\.js|\.ts)/.test(file));
commandFiles.forEach((file: string): void => {
  const command: Command = require(path.resolve(__dirname, `./gg/${file}`)).default;
  ggCommands.set(command.name, command);

  // Clone additional commands if current command has aliases
  if (command.aliases && command.aliases.length > 0) {
    command.aliases.forEach((alias): void => {
      ggCommands.set(alias, command);
    });
  }
});

export { ggCommands };

export default {
  name: 'gg',
  description: 'puyo.gg League Commands',
  aliases: [],
  category: ['League'],
  usage: ['gg [subcommand] [parameters...]'],
  execute(message: Discord.Message, args: string[], client: Discord.Client): void {
    if (args.length === 0) {
      message.reply('The .gg command was called without any parameters.');
      return;
    }

    const subCommandName = args[0].toLowerCase();
    const subCommand = <Command>ggCommands.get(subCommandName);

    if (!subCommand) return;

    try {
      subCommand.execute(message, args.slice(1), client);
    } catch (e) {
      console.error(e);
      message.channel.send('Error: View console log for more details.');
    }
  },
};
