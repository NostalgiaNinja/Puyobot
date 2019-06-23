import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';
import { Command } from '../../@types/bot';

const ggAdminCommands = new Discord.Collection();

const commandFiles = fs.readdirSync(path.resolve(__dirname, './admin')).filter((file: string): boolean => /(\.js|\.ts)/.test(file));
commandFiles.forEach((file: string): void => {
  const command: Command = require(path.resolve(__dirname, `./admin/${file}`)).default;
  ggAdminCommands.set(command.name, command);

  if (command.aliases && command.aliases.length > 0) {
    command.aliases.forEach((alias): void => {
      ggAdminCommands.set(alias, command);
    });
  }
});

export { ggAdminCommands };

export default {
  name: 'admin',
  description: 'puyo.gg League Commands',
  aliases: [],
  category: ['League'],
  usage: ['.gg admin [subcommand] [parameters...]'],
  execute(message: Discord.Message, args: string[], client: Discord.Client): void {
    if (args.length === 0) {
      message.reply('The .gg admin command was called without any parameters.');
    }

    if (!message.member.hasPermission('ADMINISTRATOR')) {
      message.reply('You need to be an administrator to use this command.');
      return;
    }

    const subCommandName = args[0].toLowerCase();
    const subCommand = <Command>ggAdminCommands.get(subCommandName);

    if (!subCommand) return;

    try {
      subCommand.execute(message, args.slice(1), client);
    } catch (e) {
      console.error(e);
      message.channel.send('Error: View console log for more details.');
    }
  },
};
