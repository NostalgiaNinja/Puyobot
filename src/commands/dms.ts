import Discord from 'discord.js';

export default {
  name: 'dms',
  description: 'Notifies a user to take the conversation to DMs',
  args: true,
  usage: '<@user>',
  category: 'Administration',
  execute(message: Discord.Message): void {
    if (message.member.hasPermission('MANAGE_ROLES')) {
      const em = new Discord.RichEmbed();
      const target = message.mentions.users.first();
      em.setTitle('Please take this to DMs!')
        .setColor(0xff0000)
        .addField(
          '**__The moderators are here to help__**',
          'Please notify a moderator if you think someone is breaking the rules. You can get our attention by pinging the @Moderators and @Junior Moderators roles. You can also message us directly via Direct Message (Right-click username > "Message").',
        );
      message.channel.send(`Hey there ${target}, I see that you could use a little help.

We love and care about every one of our server users, and we really hope that you get the help you deserve. This message may sound clinical, but it's true! The unfortunate thing is that this server's public channels aren't equipped to handle serious conversations like this, and most of the server members aren't trained.

In situations like this, we ask you to privately DM close friends or others who you trust to get support; people who know you better than the average chatroom user, and can create a space where you can vent safely. Some of those people could be who you know in our server! Through DMs, they can help you better through one-on-one conversation.

If necessary - and possible - there are real life resources who can help you, such as therapists. If you need help and don't know where to start, you can always use this online guide from the National Institute of Mental Health: https://www.nimh.nih.gov/health/find-help/index.shtml

Please take care; you deserve help. A strong support system online and offline can go a long way to helping you live your best.

**If you aren\'t pinged in this message, please give this topic some space and change to a new one. Let the person pinged DM the people they feel comfortable with instead of DMing them yourself (unless they ask).**`);
    }
    else
    {
      message.reply("This command is only for mods to use.");
    }
  },
};
