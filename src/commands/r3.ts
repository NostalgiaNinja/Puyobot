import Discord from 'discord.js';

module.exports = {
  name: 'r3',
  description: 'Displays Rule 3 in an embed',
  args: true,
  usage: '',
  execute(message: Discord.Message): void {
    const em = new Discord.RichEmbed();
    em.setTitle('Rule 1:')
      .setColor(0xff0000)
      .addField(
        '**Keep it safe for work.**',
        'As per the Discord Terms of Use, explicit content is strictly prohibited. Sexual, violent, or otherwise disturbing imagery, language, or implications is unnacceptable. *Violating this rule is likely to be an immediate permanent ban. Not knowing the rules is inexcusable.*',
      );
    message.channel.send(em);
  },
};
