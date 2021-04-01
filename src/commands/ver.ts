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
      .setDescription('DM patches!')
      .setColor(0x59afef)
      .addField('DM checks put in place for commands exclusively for use on servers', "Yikes command won't break now when using it in DMs", false)
      .addField('console outputs cleaned up', 'minor debugging tools cleaned up that were left behind.', false)
      .setFooter('Puyobot ver.' + version + ' made by the English Puyo Puyo Community, for the English Puyo Puyo Communtiy!');

    message.channel.send(em);
  },
};
