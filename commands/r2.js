const Discord = require('discord.js');

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setTitle("Rule 2:")
    .setColor(0xFF0000)
    .setDescription("**Be excellent to each other.** This Discord is a joint effort across the entire Puyo community, and brings together people of many different creeds and upbringings, ages and backgrounds. Please treat everybody with respect. Trolling, inflammatory or derogatory comments, discrimination of any kind, hate speech, and personal attacks are not permitted. **Unacceptable content includes (but is not limited to)** use of autism/retard as a derogatory term, triggered jokes, gender jokes (including the use of ‘trap’ to describe a person), and racist terms.");
  message.channel.send(em);
}
