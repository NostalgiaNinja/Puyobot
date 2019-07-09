// delete message handler - fires when a message is deleted, and then returns what got deleted.
import Discord from 'discord.js';
import sqlite3 from 'sqlite3';
sqlite3.verbose();
const dbFile = './src/data/database.sqlite';
const db = new sqlite3.Database(dbFile);

export default (client: Discord.Client, message: Discord.Message): void => {
  try {
    db.each(`SELECT * FROM server WHERE serverID = '${message.guild.id}'`, function(err, row): void {
      // SQL - Select everything from server where serverID is the guild ID.  THEN

      if (!row) return; // Checks if the guildID has been initialized

      if (!client.channels.get(row.moderationChannel)) return; // checks if the channel exists

      if (message.content.length > 1000) return; // check if the command is higher than 1000 characters and if so don't throw an error.

      const em = new Discord.RichEmbed(); // create a new rich embed.
      em.setTitle('Message Deleted');
      em.addField('Message Author', message.author.username, true);
      em.addField('Message created at', message.createdAt, true);

      if (message.content.length !== 0) {
        em.addField('Message content:', message.content, false); // if there's no content, skip.
      }

      em.addField('Channel Name:', (message.channel as Discord.TextChannel).name, false);
      em.setColor(0x59afef);
      em.setFooter('Message deleted at ' + new Date());

      // Have to test for undefined and check type as Text Channel as "Type Guards"
      // https://stackoverflow.com/questions/53563862/send-message-to-specific-channel-with-typescript
      const modChannel = client.channels.get(row.moderationChannel);
      if (!modChannel) return;
      if (!((modChannel): modChannel is Discord.TextChannel => modChannel.type === 'text')(modChannel)) return;
      modChannel.send(em).catch(console.error);
    });
  } catch (e) {
    console.error(e);
  }
};
