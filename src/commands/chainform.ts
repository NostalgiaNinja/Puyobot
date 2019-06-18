import Discord from 'discord.js';

export default {
  name: 'chainform',
  description: 'Provides the list of chaining forms if none are listed.',
  aliases: ['cf'],
  category: ['Help'],
  usage: [''],
  execute(message: Discord.Message): void {
    const em = new Discord.RichEmbed();

    em.setColor(0x59afef);
    em.setTitle('List of Chaining forms');
    em.setDescription('https://puyonexus.com/wiki/List_of_Chaining_Forms');

    // TODO: mini-guides.

    message.channel.send(em);
  },
};
