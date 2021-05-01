import Discord from 'discord.js';

export default {
  name: 'questbattle',
  description: 'Provides Puyo Puyo!! Quest Players the command to open up multiplayer battles.',
  args: true,
  usage: '<Room Code> <Quest Access> <Quest Title - Optional>',
  category: 'PPQ',
  aliases: ['qb', 'bq'],
  execute(message: Discord.Message, args: string[]): void {
    const em = new Discord.MessageEmbed();

    const roomcode = args[0];
    const roomtype = args[1];
    const roomname = args.slice(2).join(' ');

    em.setTitle('You are being challenged by ' + message.author.username);
    em.setColor(0x00ffff);

    switch (roomtype) {
      case '1':
        em.addField('Room Type', 'Standard PvP', true);
        break;

      case '2':
        em.addField('Room Type', 'Death Match', true);
        break;

      case '3':
        em.addField('Room Type', 'Fight Club', true);
        break;

      case '4':
        em.addField('Room Type', 'Target Practice', true);
        break;

      default:
        em.addField('Room Type', 'Standard PvP (Unspecified)', true);
        break;
    }

    const testRegex = /^\d{6}$/;
    if (testRegex.test(roomcode) == false) {
      message.channel.send('Room Code Invalid!');
      return;
    }

    em.addField('Room Code', roomcode, true);

    if (roomname) {
      em.addField('Room Name', roomname, true);
    }

    em.addField('TAPI link:', 'https://tapi.puyoquest.jp/multibattle/redirect/?room_no=' + roomcode, false);
    em.setThumbnail('https://cdn.discordapp.com/emojis/429944006135382017.png');

    message.channel.send(em);
  },
};
