const Discord = require('discord.js');
const sql = require('sqlite');
const fs = require('fs');
const config = require('../config.json');

const prefix = config.prefix;

//Scope: Set up guild in database
//database fields: (serverID TEXT, moderatorID TEXT, moderationChannel TEXT, mutedRoleID TEXT)

exports.run = (client, message, args) =>
{
    if(message.member.hasPermission("MANAGE_ROLES"))  //checks for Manage roles permissions on Discord
    {
        let id = args[0] //the whatever ID you're putting
        let type = args[1] //the Type of ID you're putting

        try
        {
            if(id.includes("@&")) //if it was a mention ie ModeratorID or MutedRoleID then
            {
                id = id.slice(3,-1) //slice the snowflake indicators out so it can be used in SQL language
            }
            if(id.includes("#")) // if it is a channel, ie ModerationChannel then
            {
                id = id.slice(2,-1) //slice the snowflake indicators out so it can be used in SQL language.
            }

            sql.get(`SELECT * FROM server WHERE serverID = ${message.guild.id}`).then(row =>
            {  //SQL: Select everything from the server table where the server ID comes from the Discord server
                if(!row) //if the row doesn't exist
                {
                    message.channel.send(`Not initialized in database! first use \`${prefix}initialize server\` to set the database up for this server.`) //kindly throw an error.
                    return;
                }
                else //else
                {

                    if (type == "ModID") //Moderator ID type added data.
                    {
                        sql.run(`UPDATE server SET moderatorID = '${id}' WHERE serverID = ${message.guild.id}`)
                        message.channel.send("Moderator ID has been added to the database.")
                    }
        
                    else if (type == "ModChannel") //Moderator Channel type added data.
                    {
                        sql.run(`UPDATE server SET moderationChannel = '${id}' WHERE SERVERID = ${message.guild.id}`)
                        message.channel.send("Moderator Channel has been added to the database.")
                    }
        
                    else if (type == "MutedRole") //Muted Role ID type added data
                    {
                        sql.run(`UPDATE server SET mutedRoleID = '${id}' WHERE SERVERID = ${message.guild.id}`)
                        message.channel.send("Muted role ID has been added to the database.")
                    }

                    else
                    {
                        message.channel.send(`Invalid Type! Please read \`${prefix}help setupserver\` for details on how to use this command.`)
                    }
            
                }
            })

        }
        catch (e)
        {
            console.log(e);
            message.channel.send("Error: ", e);
        }
    }
}