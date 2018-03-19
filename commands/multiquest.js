//new multiplayer quest data

const Discord = require('discord.js');
const config = require('../config.json')

var prefix = config.prefix;

exports.run = (client, message, args) =>

{

    try
    {
        em = new Discord.RichEmbed();

        let roomcode = args[0];
        let roomaccess = args[1];
        let roomname = args.slice(2).join(" ");

        let roomaccessvalue = "";

        //set up the richEmbed values beforehand: no needing to mess with Room access values any longer.
        em.setTitle("A Multiplayer Quest room has opened!");

        if (roomname) //check if room name exists
        {
            if (roomaccess != "LINE") //if room access not LINE, allow the room name to show
            {
                em.addField("Room Name", roomname, true);
            }
        }

        //new fancy switch... case statements to make room access easier to determine.
        switch(roomaccess)
        {
            case '1':
                em.addField("Room Access:", "Open to Public", true);
                em.setColor(0x004080);
                break;

            case '2':
                em.addField("Room Access:", "Open to Guild", true);
                em.setColor(0x00FF00);
                break;

            case '3':                
                em.addField("Room Access:", "Code Only", true);
                em.setColor(0xFF0000);
                break;

            case 'LINE':
                em.addField("Room Access:", "LINE Stone Linkage", true);
                em.setColor(0x59AFEF);
                break;

            default:
                em.addField("Room Access", "Code Only (unspecified)");
                em.setColor(0x59AFEF);
                break;
        }

        var testRegex = /^\d{6}$/; //Checks the 6 digit code for standard case-by-case basis
        if (testRegex.test(roomcode) == false)
        {
            message.channel.send("room code invalid!  Exiting!");
            return;
        }

        em.addField("Room Code",roomcode,true);

        if (roomaccess == "LINE")  //if the room is LINE linked, then show this
        {   
            let ppq_uid = roomname;
            em.addField("TAPI Link:",`https://tapi.puyoquest.jp/multi/redirect/?room_no=` + roomcode + `&invite_display_person_id=` + ppq_uid, false);
        }
        else //else show this
        {
            em.addField("TAPI link:","https://tapi.puyoquest.jp/multi/redirect/?room_no=" + roomcode, false);
        }

        message.channel.send(em);
    }
    catch (e)
    {
        message.channel.send("Error: " + e);
    }
}