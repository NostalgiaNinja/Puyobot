import Discord from 'discord.js';

export default {
  name: 'notpuyo',
  description: "He doesn't play Puyo!?!?",
  args: false,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message): void {
    const em = new Discord.MessageEmbed();
    em.setImage('http://imgur.com/tf1Ycna.jpg');
    message.channel.send(em);
  },
};
