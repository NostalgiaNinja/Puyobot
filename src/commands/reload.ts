import config from '../config.json';
import Discord from 'discord.js';

module.exports = {
  name: 'reload',
  description: 'clears the cache for commands to be run.',
  args: true,
  aliases: ['clearcache', 'cc'],
  category: 'Administration',
  execute(message: Discord.Message): void {
    if (message.author.id === config.botOwnerID) {
      try {
        process.exit();
      } catch (e) {
        console.log(e);
        message.channel.send('Something went wrong!  check the console log for more details!');
      }
    } else {
      message.channel.send('This command is intended for Bot Owner only, used to reload commands which require emergency fixing.');
    }
  },
};
