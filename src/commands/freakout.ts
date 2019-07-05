import Discord from 'discord.js';

export default {
  name: 'freakout',
  description: 'Ringo Freaks out',
  args: false,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message): void {
    const em = new Discord.RichEmbed();
    em.setImage('http://imgur.com/Kl61MLn.gif');
    message.channel.send(em);
  },
};
