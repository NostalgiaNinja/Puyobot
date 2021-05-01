import Discord from 'discord.js';

export default (client: Discord.Client): void => {
  console.log('Puyobot ready!');

  client.user?.setPresence({ activity: { name: 'Ready' }, status: 'online' });
};
