//help syntaxes - needs to be rewritten as per command handler update
const Discord = require('discord.js');
const config = require('../config.json');

const prefix = config.prefix;

exports.run = (client, message, args) =>
{
  let postfix = args[0];

  let poihammer = client.emojis.get("393085640046018561");

  em = new Discord.RichEmbed();

  try
  {
    if ((!postfix) || (postfix == "here"))  //if there's no arguments, send a DM to the user who requested the command list.
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
                        prefix + "ping\n" +
                        prefix + "currentTime*\n" +
                        prefix + "chainsim\n" +
                        prefix + "questBattle* \n" +
                        prefix + "multiQuest*")
        .addField("Bot Owner Functions ONLY:", prefix + "kill\n" +
                        prefix + "reload\n" +
                        prefix + "setpresence", false)
        .addField("Moderator functions: if suffixed with a hammer, means higher privledged moderator functions", prefix + "warn*\n" +
                        prefix + "setupserver* " + poihammer +"\n" +
                        prefix + "getids " + poihammer + "\n" +
                        prefix + "initialize* " + poihammer, false)
        .addField("an asterisk denotes commands which have subhelp", "use `help [command name]` for more details.");
      if (!postfix)
      {
        if (message.channel.type === "dm")
        {
          message.channel.send(em);
        }
        else
        {
          message.reply("check your DMs!");
          message.member.send(em);
        }
      }
      if (postfix == "here")
      {
        message.channel.send(em);
      }
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
    else if (postfix == "currentTime")  //checks for arguments to see MultiQuest, if so, provides in-channel help for the person who requested it.
    {
      em.setTitle("HELP: Current Time Help: Syntax")
        .setColor(0x59AFEF)
        .setDescription(prefix + "currenttime [timezone]")
        .addField("to find timezone:", `use ${prefix}currenttime help`,false)
        .setFooter("Timezone information brought to you by Moment Timezone");
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
    else if (postfix == "setupserver")
    {
      em.setTitle("HELP: Setting up server administration:")
        .setColor(0x00FF00)
        .setDescription(prefix + "setupserver [type of ID to set up]")
        .addField("Adds a database entry to the server.", "there are three types:")
        .addField("ModID", "Sets up the Moderator ID for moderator exclusive commands")
        .addField("ModChannel", "Sets up the Moderation channel for logging purposes")
        .addField("MutedRole", "Sets up the Muted role so that Puyobot can mute people with reason.");
      message.channel.send(em);
    }
    else if (postfix == "initialize")
    {
      em.setTitle("HELP: Initializing server database:")
        .setColor(0x00FF00)
        .setDescription(prefix + "initialize [type of server initialization to set up]")
        .addField("Initializes database entries for the server, or initializes the database itself", "There are two types:")
        .addField("server", "Initializes the server.  Anyone with MANAGE_ROLE permissions will be able to do this")
        .addField("database", "Only Bot Owner will be able to use this.  Initializes the database for use on multiple servers.");
      message.channel.send(em);
    }
  }
  catch (e)
  {
      message.channel.send("Cannot send message: Error details as follows:\n" + e + "\n ping NN immediately!");
  }
}
