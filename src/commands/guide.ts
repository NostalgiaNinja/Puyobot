import Discord from 'discord.js';

export default {
  name: 'guide',
  description: 'Provides a set of guides for Puyo players to better themselves at playing Puyo.',
  aliases: ['g'],
  category: ['Help'],
  usage: [''],
  execute(message: Discord.Message, args: string[]): void {
    const postfix = args[0];

    const em = new Discord.RichEmbed();

    if (!postfix) {
      em.setColor(0x59afef);
      em.setTitle('Guides:');
      em.addField('Puyo Nexus: How to play Puyo Puyo!', 'https://puyonexus.com/wiki/How_to_Play_Puyo_Puyo', false);
      em.addField('Puyo Puyo lesson plan', 'https://puyo.guide', false);
      em.addField('**outdated** How to think', 'https://puyonexus.com/forum/viewtopic.php?f=3&t=26');
      em.addField('**outdated** Guide to losing battles', 'https://puyonexus.com/forum/viewtopic.php?f=3&t=3445');
      em.addField('**outdated** Observational Skillsets', 'https://puyonexus.com/forum/viewtopic.php?f=3&t=2921');
      em.addField('Multiquest Guide', '.guide mq');
      em.addField('Questbattle Guide', '.guide qb');
      em.setFooter('Guides will be added when they are released.');
    }
    // TODO: mini-guides. - partly done

    if (postfix == 'qb') {
      em.setTitle('HELP: Multiplayer Battle help.  Syntax:')
        .setColor(0x00ff00)
        .setDescription('questBattle (Battle Code) (Battle Type) (Battle Title - Optional)')
        .addField('Battle Code', 'get the quest code from your Everybody Battle!! game', false)
        .addField('Battle Type', '1: **Standard PvP**' + '\n2: **Death Match** (1 row vs. 1 row)', false)
        .addField('For EXP:', '3: **Fight Club** (visitor brings close to nothing, lets host kill as quickly as possible)' + '\n4: **Target Practice** (host lets visitor kill as quickly as possible)')
        .addField('Battle Title', 'A description for your battle, optional.', false)
        .setFooter('Battles will come with a TAPI PPQ link for members to join.  Please use responsibly!');
    } else if (postfix == 'mq') {
      em.setTitle('HELP: Multiplayer Quest help.  Syntax:')
        .setColor(0x00ff00)
        .setDescription('multiQuest (Quest Code) (Quest Access) (Quest title - optional)')
        .addField('Quest Code', 'Get the quest code from your Everybody Quest!! game', false)
        .addField('Quest Access', '1: **Open to Public**\n2: **Open to Guild**\n3: **Code Only**\nLINE: ***LINE stone linkage***', false)
        .addField('Quest Title', 'A description for your quest, optional.', false)
        .addField('For Line stone Linkage:', '.multiquest (quest code) LINE (PPQ User ID)')
        .setFooter('Quests will come with a TAPI PPQ link for members to join.  Please use responsibly!');
    }

    message.channel.send(em);
  },
};
