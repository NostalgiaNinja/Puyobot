import Discord from 'discord.js';

module.exports = {
  name: 'r4',
  description: 'Displays Rule 4 in an embed',
  args: true,
  usage: '',
  execute(message: Discord.Message): void {
    const em = new Discord.RichEmbed();
    em.setTitle('Rule 1:')
      .setColor(0xff0000)
      .addField(
        '**Do not link to pirated material or discussions about where to pirate material.** ',
        'Linking to pirated material is against the Terms of Use and the law in and of itself, as such we are strict about this.  \n*Discussion about other things within the topic of emulation is however acceptable, these include topics such as emulators, romhacking, patching, etc.*',
      );
    message.channel.send(em);
  },
};
