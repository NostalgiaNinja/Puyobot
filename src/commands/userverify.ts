import Discord from 'discord.js';

export default {
	name: 'userverify',
	description: 'Verify a user into the Discord',
	args: true,
	usage: '[@user]',
	category: 'administration',
    execute(message: Discord.Message, args: string[]): void {
        const config = require('../config.json');        
        
        if (message.member.hasPermission('MANAGE_ROLES')) {
            
            const verifyUser = message.mentions.members.first();
           
            try {
                verifyUser.removeRole(config.verifyUserID,`User verified by ${message.author.username}`);
                const em = new Discord.RichEmbed();
                em.addField('User Verified', `Please let the user know that their access has been granted.`);
                message.channel.send(em);
            }
            catch (e) {
                console.log(e);
                return;
            }
        }


	},
};
