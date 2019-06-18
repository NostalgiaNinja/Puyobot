import Discord from 'discord.js';

export default {
  name: 'ping',
  description: "Just pings the program to see if it's alive",
  usage: '',
  execute(message: Discord.Message): void {
    const em = new Discord.RichEmbed().setTitle('Pong!').setColor(0x00ff00);
    message.channel.send(em).catch(console.error);
  },
};
