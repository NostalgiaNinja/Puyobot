import Discord from 'discord.js';
import { version } from '../../package.json';

export default {
  name: 'ver',
  description: "Versions, and what's new in the bot!",
  aliases: ['version', 'v'],
  category: ['Help'],
  usage: [''],
  execute(message: Discord.Message): void {
    const em = new Discord.RichEmbed();
    em.setTitle('Puyobot version ' + version)
      .setDescription('TypeScript update!')
      .setColor(0x59afef)
      .addField('Rule aliases added!', 'Added additional aliases to rules, use `rule#` where # is the rule number to apply rules.  old r# aliases still work, too!', false)
      .addField('Yikes update: Resetter added', 'Resetter for .yikes added, number has been reset to 0 for most servers as a result.')
      .setFooter('Puyobot ver.' + version + ' made by the English Puyo Puyo Community, for the English Puyo Puyo Communtiy!');

    message.channel.send(em);
  },
};
