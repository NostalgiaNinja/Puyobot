import Discord from 'discord.js';

export default {
  name: 'dracopraying',
  description: 'Draco wishes you the best!',
  args: false,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message): void {
    const em = new Discord.MessageEmbed();
    em.setImage('http://imgur.com/w4FeIqZ.png');
    message.channel.send(em);
  },
};
