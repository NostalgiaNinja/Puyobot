import Discord from 'discord.js';

export default {
  name: 'rule5',
  description: 'Displays Rule 5 in an embed',
  args: true,
  aliases: ['r5'],
  usage: '',
  execute(message: Discord.Message): void {
    const em = new Discord.MessageEmbed();
    em.setTitle('Rule 5:')
      .setColor(0xff0000)
      .addField(
        '**__Do not repost artwork without a link to original source.__**',
        'If you did not create the art or have ownership of the art (i.e. commission), you are not allowed to share the artwork without a **direct link to the original source.** If the artist in question states to ask for permission, you will have to ask.\nDrawn meme images still count as artwork and may be in violation of this rule. (This includes the infamous dabbing Sig image).\n\n*Acceptable sources include: DeviantART, Tumblr, Twitter, PIXIV, FurAffinity, and personal blogs or portfolios. Please also bear in mind Rule 3 when linking the source.\n**Unacceptable** sources include: Imageboard boorus (Safebooru and its derivatives), Pinterest, WeHeartIt, FunnyJunk, Amiino, Patreon, repost/aesthetic blogs, among others*',
      )
      .addField(
        '**Addendum**',
        'For a guide on sourcing artwork and getting permission for reposting, along with a template for asking permission from non-English speakers, and more relevant topics for sourcing, please refer to this document:  https://docs.google.com/document/d/1XLchLr0S7WUNNet8LLHSS7eVqvcj1PI2cg47jtKuZqM/%3E \nIf you are denied permission, you are not allowed to post it.',
      );
    message.channel.send(em);
  },
};
