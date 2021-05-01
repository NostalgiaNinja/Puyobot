import Discord from 'discord.js';

export default {
  name: 'ping',
  description: "Just pings the program to see if it's alive",
  usage: '',
  execute(message: Discord.Message, Client: Discord.Client): void {
    const em = new Discord.MessageEmbed().setTitle('Pong!').setColor(0x00ff00);
    message.channel.send(em).catch(console.error);
  },
};
