import Discord from 'discord.js';

export default {
  name: 'pickreactor',
  description: "Pick a random user from a message's reactions",
  args: true,
  category: 'fun',
  usage: ['pickreacter #channel messageID'],
  async execute(message: Discord.Message, args: string[]): Promise<void> {
    if (!message.member?.permissions.has('MANAGE_MESSAGES')) {
      return;
    }
    if (args.length !== 2) {
      message.reply('Error. Incorrect number of arguments supplied.');
      return;
    }

    const targetChannel = <Discord.TextChannel>message.guild?.channels.resolve(args[0].replace(/\D/g, ''));

    if (!targetChannel) {
      message.reply('Error. The target channel could not be found.');
      return;
    }

    const targetMsg = await targetChannel.messages.fetch(args[1]);

    // Get the messageReactions on the target message
    const messageReactions = targetMsg.reactions.cache.array();
    
    // Combine the lists of users who reacted with each emoji
    const allUsers: string[] = [];
    for (const messageReaction of messageReactions) {
      const userCollection = await messageReaction.users.fetch();
      const userIds = userCollection.keyArray();
      allUsers.push(...userIds);
    }

    // Some users may have given multiple reactions with different emojis.
    // Find the unique set of users.
    const uniqueUserIds = [...new Set(allUsers)];

    // Select a random user
    const randomUser = uniqueUserIds[Math.floor(Math.random() * uniqueUserIds.length)];
    message.reply(`${uniqueUserIds}.length user(s) reacted to your message. The randomly chosen user is: <@${randomUser}>`);
  },
};
