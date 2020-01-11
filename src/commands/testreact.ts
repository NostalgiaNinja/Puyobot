import Discord from 'discord.js';

export default {
  name: 'testreact',
  description: 'reaction test for await and response',
  args: false,
  usage: '',
  category: 'fun',
  async execute(message: Discord.Message): Promise<void> {
    console.log('response');

    const em = new Discord.RichEmbed();

    em.setTitle('Response!');

    const sentMessage = await message.channel.send(em).then(
      (sentMsg): Discord.Message => {
        (sentMsg as Discord.Message).react('👌');
        return sentMsg as Discord.Message;
      },
    );

    const filter = (reaction: Discord.MessageReaction, user: Discord.User): boolean => {
      console.log('filter result', reaction.emoji.name === '👌');
      return reaction.emoji.name === '👌';
    };

    sentMessage
      .awaitReactions(filter, { maxUsers: 2, time: 10000, errors: ['time'] })
      .then((collected): void => {
        const reaction = collected.first();
        //get the reaction users, the bot will be excluded afterwards and the remaining user can be used with
        if (reaction.emoji.name === '👌') console.log('reacted', reaction.users);
      })
      .catch((collected: Discord.Collection<string, Discord.MessageReaction>): void => {
        console.log('timeout'); //here?
      });
  },
};
