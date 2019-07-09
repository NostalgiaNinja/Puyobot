import Discord from 'discord.js';

export default {
  name: 'jpterms',
  description: 'Japanese terms for those wanting to learn the English descriptions',
  args: false,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message): void {
    const em = new Discord.RichEmbed();

    em.setTitle('Basic English Puyo Termiology for Japanese Players')
      .setColor(0x00ff00)
      .addField(
        'In-game Terms',
        '連鎖 (れんさ) - Chain \n全消し (ぜんけし) - All Clear \n全消し戦 (ぜんけしせん) - All Clear Opening \n本線 (ほんせん) - Main Chain \n二連鎖ダブル - (2 Double) Power 2 Chain/Hellfire \n連鎖尾 (れんさび) - Chain Cut/Power Chain \n動力連鎖  (ふはつだん) - Napalm (Power 1 Chain) \n対応 (たいおう)- Counterattack \n発火 (はっか) - Trigger Point (start of chain) \n折り返し (おりかえし) - Transition \nセカンド - Second Main Chain/Double Counter',
        true,
      )
      .addField(
        'Common Chain Forms',
        '階段積み (かいだんつみ) - Stairs \n鍵積み (かぎつみ) - Sandwich \nだぁ積み (だあつみ) - L-Shape \n弥生時代 (やよいじだい) - Yayoi \n平積み (ひらつみ) - Flatstacking \nハーピー積み - Harpy Stacking \nカエル積み - Frog Stacking \n雪崩 - Avalanche (Form of Tail)',
        true,
      );

    message.channel.send(em);
  },
};
