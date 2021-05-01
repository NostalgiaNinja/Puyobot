import Discord from 'discord.js';

export default {
  name: 'carbunclepop',
  description: 'Ready?  Go!',
  args: false,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message): void {
    const em = new Discord.MessageEmbed();
    em.setImage('https://imgur.com/WrJmrmY.gif');
    message.channel.send(em);
  },
};
