import Discord from 'discord.js';

export default {
  name: 'yaa',
  description: 'Shio in a pot saying "Yaa"',
  args: false,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message): void {
    const em = new Discord.MessageEmbed();
    em.setImage('http://imgur.com/gLgHsmo.png');
    message.channel.send(em);
  },
};
