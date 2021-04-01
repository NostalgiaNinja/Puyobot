//initialization of database items always outside the module exports
//db: charaicon (character, urlcode)
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./src/data/database.sqlite');
import Discord from 'discord.js';

export default {
  name: 'testicon',
  description: 'Thumbnail testing tool',
  args: true,
  usage: '',
  category: 'utility',
  execute(message: Discord.Message, args: string[]): void {
    const em = new Discord.RichEmbed();
    const testval = args[0];

    db.get(`SELECT * FROM charaicon WHERE character = '${testval}'`, function(err, row): void {
      if (!row) {
        em.addField('character not added', 'please verify if the name is correct or you made a mistake.');
        message.channel.send(em);
        return;
      } else
        em.setThumbnail(row.urlcode)
          .setTitle('Thumbnail test tool')
          .setDescription(`Character: ${row.character}`);
      message.channel.send(em);
    });
  },
};
