import Discord from 'discord.js';

export default {
  name: 'thegirlwiththefunnyhat',
  description: "So, who's the girl in the funny hat?",
  args: false,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message): void {
    const em = new Discord.RichEmbed();
    em.setImage('http://imgur.com/6mBanRD.jpg');
    message.channel.send(em);
  },
};
