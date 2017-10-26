//help syntaxes - needs to be rewritten as per command handler update
const Discord = require('discord.js');
const config = require('../config.json');

const prefix = config.prefix;

exports.run = (client, message, args) =>
{
  let postfix = args[0];

  em = new Discord.RichEmbed();

  try
  {
    if (!postfix)  //if there's no arguments, send a DM to the user who requested the command list.
    {
      em.setTitle("HELP!  Puyobot Command List. commands are NOT CASE SENSITIVE!")
          .setColor(0x00FF00)
        .setDescription(prefix + "r1\n" +
                        prefix + "r2\n" +
                        prefix + "r3\n" +
                        prefix + "r4\n" +
                        prefix + "r5\n" +
                        prefix + "help\n" +
                        prefix + "ver\n" +
                        prefix + "amIAlive\n" +
                        prefix + "currentTime\n" +
                        prefix + "multiQuest")
        .addField("Bot Owner Functions ONLY:", prefix + "kill\n" +
                             prefix + "eval\n" +
                             prefix + "setgame", false)
        .addField("Moderator functions:", prefix + "warn", false)
        .setFooter("type " + prefix +  "help and the name of the command you need help with for more details.");
      message.reply("check your DMs!");
      message.member.send(em);
    }
    else if (postfix == "multiQuest")  //checks for arguments to see MultiQuest, if so, provides in-channel help for the person who requested it.
    {
      em.setTitle("HELP: Multiplayer Quest help.  Syntax:")
        .setColor(0x00FF00)
        .setDescription(prefix + "multiQuest (Quest Code) (Quest Access) (Quest title - optional)")
        .addField("Quest Code", "Get the quest code from your Everybody Quest!! game",false)
        .addField("Quest Access","1: **Open to Public**\n2: **Open to Guild**\n3: **Code Only**",false)
        .addField("Quest Title","A description for your quest, optional.",false)
        .setFooter("Quests will come with a TAPI PPQ link for members to join.  Please use responsibly!");
      message.channel.send(em);
    }
    else if (postfix == "questBattle") //checks for arguments to see QuestBattle, if so, provides in-channel help for the person who requested it.
    {
      em.setTitle("HELP: Multiplayer Battle help.  Syntax:")
        .setColor(0x00FF00)
        .setDescription(prefix + "questBattle (Battle Code) (Battle Type) (Battle Title - Optional)")
        .addField("Battle Code", "get the quest code from your Everybody Battle!! game", false)
        .addField("Battle Type", "1: **Standard PvP**" +
                    "\n2: **Death Match** (1 row vs. 1 row)",false)
        .addField("For EXP:","3: **Fight Club** (visitor brings close to nothing, lets host kill as quickly as possible)" +
        "\n4: **Target Practice** (host lets visitor kill as quickly as possible)")
        .addField("Battle Title", "A description for your battle, optional.",false)
        .setFooter("Battles will come with a TAPI PPQ link for members to join.  Please use responsibly!");
      message.channel.send(em);
    }
    else if (postfix == "warn")
    {
      em.setTitle("HELP: Warn user:")
        .setColor(0x00FF00)
        .setDescription(prefix + "warn [user to warn] [warning]")
        .addField("warns a user and logs it appropriately", "An embed will respond.",false);
      message.channel.send(em);
    }
  }
  catch (e)
  {
      em.setTitle("Error!")
        .setColor(0xFF0000)
        .setDescription(e);
      message.channel.send("Cannot send message: Error details as follows:\n" + e + "\n ping NN immediately!");
  }
}
