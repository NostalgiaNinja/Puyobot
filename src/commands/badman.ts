import Discord from 'discord.js';

export default {
  name: 'badman',
  description: "You're a bad man!!!",
  args: false,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message): void {
    const em = new Discord.MessageEmbed();
    em.setImage('http://imgur.com/vER4TMz.jpg');
    message.channel.send(em);
  },
};
