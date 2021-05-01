import Discord from 'discord.js';
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./src/data/database.sqlite');

export default {
  name: 'charicon',
  description: 'Insert Character icons for Puyo Puyo Quest to show them in multiquests.',
  args: false,
  usage: '[character name], [character URL]',
  category: 'utility',
  execute(message: Discord.Message): void {
    if (message.channel.type === 'dm') {
      const em = new Discord.MessageEmbed();

      em.setTitle('Server exclusive command')
        .setDescription('This command is intended for server use only!')
        .setFooter('With love, Nostalgia Ninja');

      message.channel.send(em);
      return;
    }

    if (message.member.hasPermission('MANAGE_ROLES')) {
      const args = message.content.slice(1).split(',');
      const em = new Discord.MessageEmbed();
      let charName = args[0].toLowerCase();
      let charURL = args[1];

      if (!charName || !charURL) {
        em.setTitle('Character Icon tool for PPQ');
        em.setDescription('requires Manage Roles permission; Thumbnails are permanent and require modification by admin.');
        em.addField('Syntax', '.charicon [character name], [character URL]');
        em.addField('Example', '.charicon Ringo, https://puyonexus.com/mediawiki/images/6/62/Img101807.png');
        em.setColor(0x59afef);
        message.channel.send(em);
        return;
      }

      if (!message.content.includes('puyonexus.com')) {
        em.setTitle('Invalid URL!')
          .setDescription('URL MUST be from Puyo Nexus!')
          .setColor(0xff0000);
        message.channel.send(em);
        return;
      }

      charName = charName.slice(9);
      charURL = charURL.slice(1);
      db.run('INSERT INTO charaicon (character, urlcode) VALUES (?, ?)', charName, charURL);

      em.addField('Character added to the Multiquest thumbnail system!', 'Please test your character thumbnail additions in a bot channel.')
        .addField('Character', charName)
        .setThumbnail(charURL)
        .setColor(0x59afef);
      message.channel.send(em);
      console.log('Character Icon added: ', charName, charURL);
    }
  },
};
