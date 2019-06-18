import Discord from 'discord.js';

export default (client: Discord.Client): void => {
  console.log('Puyobot ready!');

  client.user.setPresence({ game: { name: 'ready', type: 'PLAYING' } });
};
