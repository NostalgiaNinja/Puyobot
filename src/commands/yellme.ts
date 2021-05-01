import Discord from 'discord.js';

export default {
  name: 'yellme',
  description: 'Yell a Puyo Quest player with this meme!!!',
  args: false,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message): void {
    const em = new Discord.MessageEmbed();
    em.setImage('http://imgur.com/ZaF0cac.jpg');
    message.channel.send(em);
  },
};
