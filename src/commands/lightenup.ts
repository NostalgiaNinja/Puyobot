import Discord from 'discord.js';

export default {
  name: 'lightenup',
  description: 'Lighten up will you?',
  args: false,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message): void {
    const em = new Discord.MessageEmbed();
    em.setImage('http://imgur.com/16JpwSp.jpg');
    message.channel.send(em);
  },
};
