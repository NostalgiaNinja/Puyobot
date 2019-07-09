import Discord from 'discord.js';

export default {
  name: 'r2',
  description: 'Displays Rule 2 in an embed',
  args: true,
  usage: '',
  execute(message: Discord.Message): void {
    const em = new Discord.RichEmbed();
    em.setTitle('Rule 2:')
      .setColor(0xff0000)
      .addField(
        '**__Be excellent to each other and mindful of your words and actions__**',
        'Our community is home to people of many different backgrounds and upbringings, so please respect everyone as you would in a public space. In other words, be mindful of what you say and how you act. Intentionally causing disruption and/or discomfort among the users is not acceptable.\nUnacceptable behavior includes, but is not limited to:\n\t• Use of offensive slurs, \n\t• Targeted harassment, \n\t• Using sexualities, identities, and/or disabilities as the butt of a joke. (This includes jokes based on "trap", "triggered", "autism", "retarded", "cancer", among others.)',
      );
    message.channel.send(em);
  },
};
