import Discord from 'discord.js';

export default {
  name: 'rule3',
  description: 'Displays Rule 3 in an embed',
  args: true,
  aliases: ['r3'],
  usage: '',
  execute(message: Discord.Message): void {
    const em = new Discord.MessageEmbed();
    em.setTitle('Rule 3:')
      .setColor(0xff0000)
      .addField(
        '**__Keep it safe for work.__**',
        'As per Discord\'s Terms of Service, explicit content is strictly prohibited. Sexual, fetish, violent, or otherwise disturbing imagery, language, content, or implications are unacceptable. This includes "loli/shota", as well as other commonly joked-about topics related to anything NSFW. \n\n*The intensity of the rule violation will result in relative moderation action. Repeated minor rule-breaks will add up, and stepping over the line too much will result in a permanent ban.*',
      );
    message.channel.send(em);
  },
};
