import Discord from 'discord.js';

export default {
  name: 'kaga',
  description: "Let's go to sleep!",
  args: true,
  usage: '[number from 1-20]',
  category: 'fun',
  execute(message: Discord.Message, args: string[]): void {
    const em = new Discord.RichEmbed();
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
      'AjJefXd.jpg'
    ];

    const suffix = Number(args[0]);

    let rng: number;

    if (isNaN(suffix)) {
      // change this value whenever you add more.
      rng = Math.floor(Math.random() * Math.trunc(20));
    }
    else {
      if (isNaN(suffix) && (suffix > 20 || suffix < 0)) {
        message.channel.send('Not a valid number! Specify a number from 0 to 20 to receive your sleep message!');
        return;
      }
      rng = Number(suffix);
    }

    em.setImage('https://imgur.com/' + kagas[Number(rng)]);
    em.setFooter('Kaga Reference number: ' + rng);
    message.channel.send(em);

  },
};

  //https://imgur.com/AjJefXd.jpg
