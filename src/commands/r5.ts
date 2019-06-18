import Discord from 'discord.js';

module.exports = {
  name: 'r5',
  description: 'Displays Rule 5 in an embed',
  args: true,
  usage: '',
  execute(message: Discord.Message): void {
    const em = new Discord.RichEmbed();
    em.setTitle('Rule 1:')
      .setColor(0xff0000)
      .addField(
        '**Do not repost artwork without a link to original source.**',
        "If you did not create the art or have ownership of the art, you are not allowed to share the artwork without a link to the original source of the image. If the artist in question states to ask for permission, you will have to ask.  \nAcceptable sources include: DeviantART, Tumblr, Twitter, PIXIV, and more. Please also bear in mind rule 3 when linking the source.  \nIf you have an image you want to share and don't know how to source, follow the instructions in the document below, or you could ask a moderator in private.  \n\nFor a full guide on how to source, get permission for reposting, templates for asking permission from non-English speakers, and some more relevant topics, please refer to this document: https://docs.google.com/document/d/1XLchLr0S7WUNNet8LLHSS7eVqvcj1PI2cg47jtKuZqM/  \nIf you are denied permission, you are not allowed to post it.",
      );
    message.channel.send(em);
  },
};
