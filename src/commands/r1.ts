import Discord from 'discord.js';

export default {
  name: 'r1',
  description: 'Displays Rule 1 in an embed',
  args: true,
  usage: '',
  execute(message: Discord.Message): void {
    const em = new Discord.RichEmbed();
    em.setTitle('Rule 1:')
      .setColor(0xff0000)
      .addField(
        '**__The moderators are here to help__**',
        'Please notify a moderator if you think someone is breaking the rules. You can get our attention by pinging the @Moderators and @Junior Moderators roles. You can also message us directly via Direct Message (Right-click username > "Message").',
      )
      .addField(
        'Each moderator will handle situations at their own discretion.',
        "This means you might see certain situations handled differently. We don't intend to be unfair though. The moderation team has a code of quality that we follow, so we do our best to make consistent and fair judgments. However, if you still feel like you or someone else was judged unfairly, don't be afraid to contact the other moderators. The moderators share info with each other, so all of us should know the details of each situation. We will properly review the situation and deal with it accordingly.",
      );
    message.channel.send(em);
  },
};
