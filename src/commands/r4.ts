import Discord from 'discord.js';

export default {
  name: 'r4',
  description: 'Displays Rule 4 in an embed',
  args: true,
  usage: '',
  execute(message: Discord.Message): void {
    const em = new Discord.RichEmbed();
    em.setTitle('Rule 4:')
      .setColor(0xff0000)
      .addField(
        '**__Piracy is illegal; do not link or discuss where to pirate materials__**',
        "Do not link to pirated sites, discuss things related to piracy, or encourage piracy. Doing so is against Discord's Terms of Use and the law, so we will be strict about this rule. This rule also considers content or services you must pay for to get the benefit of, such as:\n\t• ripped movies to watch for free,\n\t• anime/manga outside of services like Crunchyroll,\n\t• content locked behind Patreon subscriptions.\n	*However, we DO allow discussion about other things within the topic of emulation. This includes topics such as emulators, romhacking, patching, net-play, etc.* We do not allow discussion of where to find ROM dumps, disc images, etc.",
      );
    message.channel.send(em);
  },
};
