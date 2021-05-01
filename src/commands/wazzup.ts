import Discord from 'discord.js';

export default {
  name: 'wazzup',
  description: 'Oshare Bones appears!',
  args: false,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message): void {
    const em = new Discord.MessageEmbed();
    em.setImage('http://imgur.com/7uneviX.gif');
    message.channel.send(em);
  },
};
