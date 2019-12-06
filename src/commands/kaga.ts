import Discord from 'discord.js';

export default {
  name: 'kaga',
  description: "Let's go to sleep!",
  args: true,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message, args: string[]): void {
    const kagas = [
      'J3MSLRU.png',
      'lQ07HO5.png',
      '5Sy9F6J.png',
      'QPjqPpq.png',
      'GwS5Uws.png',
      'zyFEEzb.jpg',
      'n4MttpD.png',
      'iDpslxP.png',
      'ayVFKaA.png',
      'WAycPdi.png',
      'Is6l8Re.png',
      'SYFbfG6.png',
      'Q609DpT.png',
      '4Ueo9W2.png',
      'IeUIwFQ.png',
      'T018Ml8.png',
      'HHpJXid.png',
      'LQxljcs.png',
      'KgCNTtM.png',
      'hP9MZvB.png',
      'AjJefXd.jpg',
    ];

    const suffix = parseInt(args[0], 10);

    let rng: number;

    if (!suffix) {
      // change this value whenever you add more.
      rng = Math.floor(Math.random() * Math.floor(21));
    } else {
      if (isNaN(suffix) == true || suffix > 20 || suffix < 0) {
        message.channel.send('Not a valid number!  Specify a number from 0 to 20 to receive your sleep message!');
        return;
      }
      rng = Math.floor(suffix);
    }

    const em = new Discord.RichEmbed();
    em.setImage('https://imgur.com/' + kagas[rng]);
    message.channel.send(em);
  },
};
