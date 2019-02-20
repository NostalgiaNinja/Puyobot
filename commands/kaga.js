module.exports = {
    name: 'kaga',
    description: 'Let\'s go to sleep!',
    args: true,
    usage: '',
    category: 'fun',
    execute(message, args) {
        const Discord = require("discord.js");

        var kagas = ["J3MSLRU.png","lQ07HO5.png","5Sy9F6J.png","QPjqPpq.png","GwS5Uws.png","zyFEEzb.jpg","n4MttpD.png","iDpslxP.png","ayVFKaA.png","WAycPdi.png","Is6l8Re.png","SYFbfG6.png","Q609DpT.png","4Ueo9W2.png","IeUIwFQ.png","T018Ml8.png","HHpJXid.png","LQxljcs.png","KgCNTtM.png","hP9MZvB.png"]

        var suffix = args[0]
    
        if (!suffix) {
    
            var rng = Math.floor(Math.random() * Math.floor(20)); //change this value whenever you add more.
    
        }
        else {
    
            if (isNaN(suffix) == true || suffix > 19 || suffix < 0) {
               message.channel.send("Not a valid number!  Specify a number from 0 to 19 to receive your sleep message!");
               return;
            }
            
            var rng = Math.floor(suffix);
        }
    
        var em = new Discord.RichEmbed();
        em.setImage("https://imgur.com/" + kagas[rng]);
        message.channel.send(em);
    },
};