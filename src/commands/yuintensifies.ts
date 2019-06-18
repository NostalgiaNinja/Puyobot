import Discord from 'discord.js';

export default {
  name: 'yuintensifies',
  description: 'Yu Intensifies!!!',
  args: false,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message): void {
    const em = new Discord.RichEmbed();
    em.setImage('http://imgur.com/qeMQywX.gif');
    message.channel.send(em);
  },
};
