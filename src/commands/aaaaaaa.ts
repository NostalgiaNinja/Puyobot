import Discord from 'discord.js';

export default {
  name: 'aaaaaaa',
  description: 'AAAAAAAAA!!!',
  args: false,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message): void {
    const em = new Discord.RichEmbed();
    em.setImage('http://imgur.com/LdrIBUY.jpg');
    message.channel.send(em);
  },
};
