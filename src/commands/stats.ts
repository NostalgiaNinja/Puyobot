import Discord from 'discord.js';

export default {
  name: 'stats',
  description: 'Show statistical information of the server',
  args: false,
  usage: '',
  category: 'Administration',
  execute(message: Discord.Message): void {
    const em = new Discord.MessageEmbed();

    em.setTitle(`Server statistics: ${message.guild.name}`);
    em.addField('Total users', message.guild.memberCount, true);
    em.addField('Owner', message.guild.owner.displayName, true);
    em.addField('Creation Date', message.guild.createdAt, false);
    em.addField('Server ID', message.guild.id, false);

    em.setColor(0x59afef);
    em.setThumbnail(message.guild.iconURL);

    message.channel.send(em);
  },
};
