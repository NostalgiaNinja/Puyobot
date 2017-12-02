const Discord = require('discord.js');
const sql = require('sqlite');
const fs = require('fs');

const config = require('../config.json');

const prefix = config.prefix;

exports.run = (client, message, args) =>
{
    if(message.member.hasPermission("MANAGE_ROLES"))
    {
        sql.get(`SELECT * FROM server WHERE serverID = '${message.guild.id}'`).then(row =>
        {
            if (!row) message.channel.send("Not initialized in database."); return;
            message.channel.send(`ServerID: ${row.serverID}\nModeratorID: ${row.moderatorID}\nModeratorChannel: ${row.moderationChannel}\nMutedRoleID: ${row.mutedRoleID}`);
        })
    }
    else return;
}