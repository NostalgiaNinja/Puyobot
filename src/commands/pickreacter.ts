import Discord from 'discord.js';

export default {
  name: 'pickreacter',
  description: "Pick a random user from a message's reactions",
  aliases: [],
  category: ['League'],
  usage: ['pickreacter #channel messageID'],
  async execute(message: Discord.Message, args: string[]): Promise<void> {
    if (args.length !== 2) {
      message.reply('Error. Incorrect number of permissions supplied.');
      return;
    }

    const targetChannel = <Discord.TextChannel>message.guild.channels.get(args[0].replace(/\D/g, ''));

    if (!targetChannel) {
      message.reply('Error. The target channel could not be found.');
      return;
    }

    const targetMsg = await targetChannel.fetchMessage(args[1]);

    const users: string[] = [];

    Promise.all(targetMsg.reactions.map((emoji): Promise<Discord.Collection<string, Discord.User>> => emoji.fetchUsers())).then((userCollections): void => {
      userCollections.forEach((collection): void => collection.forEach((user): number => users.push(user.id)));
      const uniqueUsers = [...new Set(users)];

      const randomUser = uniqueUsers[Math.floor(Math.random() * uniqueUsers.length)];
      message.reply(`${uniqueUsers.length} user(s) reacted to your message. The randomly chosen user is: <@${randomUser}>`);
    });
  },
};
