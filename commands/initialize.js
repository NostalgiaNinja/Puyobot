const Discord = require('discord.js');
const sql = require('sqlite');
const fs = require('fs');
const config = require('../config.json');

const prefix = config.prefix;


//Scope: Set up the database for multi-server uses

exports.run = (client, message, args) =>
{

    if (message.member.hasPermission("MANAGE_ROLES"))
    {

        let type = args[0];

        try
        {

            if(message.channel.type === "dm")
            {
                message.channel.send("Please do not use this command in DMs!");
                return;
            }

            if (type == "database")
            {
                if (message.author.id != config.botOwnerID)
                {
                    message.channel.send("This is used to initialize the database.  If not initialized, ask the bot owner to run this command.")
                    return;
                }
                sql.run(`CREATE TABLE IF NOT EXISTS server (serverID TEXT, moderatorID TEXT, moderationChannel TEXT, mutedRoleID TEXT)`);

                message.channel.send("Database initialized successfully!")
                console.log("Database tables initialized.")
            }

            if (type == "server")
            {
                sql.run(`INSERT INTO server (serverID) VALUES (?)`,message.guild.id)
                message.channel.send("Server ID initialized");
            }

        }
        catch (e)
        {
            message.channel.send(e)
        }

    }

}