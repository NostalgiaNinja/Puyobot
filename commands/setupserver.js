const Discord = require('discord.js');
const sql = require('sqlite');
const fs = require('fs');
const config = require('../config.json');

const prefix = config.prefix;

//Scope: Set up guild in database
//database fields: (serverID TEXT, moderatorID TEXT, moderationChannel TEXT, mutedRoleID TEXT)

exports.run = (client, message, args) =>
{
    if(message.member.hasPermission("MANAGE_ROLES"))
    {
        let id = args[0]
        let type = args[1]

        try
        {
            if(id.includes("@&"))
            {
                id = id.slice(3,-1)
            }
            if(id.includes("#"))
            {
                id = id.slice(2,-1)
            }

            if (type == "ModID")
            {
                sql.run(`UPDATE server SET moderatorID = '${id}' WHERE serverID = ${message.guild.id}`)
                message.channel.send("Moderator ID has been added to the database.")
            }

            if (type == "ModChannel")
            {
                sql.run(`UPDATE server SET moderationChannel = '${id}' WHERE SERVERID = ${message.guild.id}`)
                message.channel.send("Moderator Channel has been added to the database.")
            }

            if (type == "MutedRole")
            {
                sql.run(`UPDATE server SET mutedRoleID = '${id}' WHERE SERVERID = ${message.guild.id}`)
                message.channel.send("Muted role ID has been added to the database.")
            }
    
        }
        catch (e)
        {
            console.log(e);
            message.channel.send("Error: ", e);
        }
    }
}