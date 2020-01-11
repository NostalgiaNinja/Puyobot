/* eslint-disable prettier/prettier */
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./src/data/database.sqlite');
import Discord from 'discord.js';

export default {
  name: 'playpuyo',
  description: 'The ability to request matchmaking and keep track of W-L ratio between players.',
  args: true,
  usage: '[stats | win | lose | reset (Moderator only parameter) | dq (Moderator only parameter)] @user(for moderator parameters.)',
  category: 'utility',
  execute(message: Discord.Message, args: string[]): void {
    //Initialization: Player database (Refers server)
    /* DATABASE TABLE PARAMETERS: 
        player table: Setting up the table for player statistics as well as player state (also known as a state machine.)
            serverID TEXT (FK),     --> Server ID to prevent gaming the system on another server.
            playerID TEXT (PK),     --> Players User ID from Discord.
            playerName TEXT         --> Player registered name for ease of table use.
            status TEXT,            --> READY | SEARCHING | PLAYING | DISQUALIFIED
            wins UNSIGNED INT,      --> Wins
            losses UNSIGNED INT,    --> Losses
            forfeits UNSIGNED INT   --> Forfeits (forfeiter gains a forfeit, winner does not gain a win)

        match table: Verifying the PLAYING state and making sure players get awarded points appropriately.
            matchID INT (PK)     --> Match ID so that either the client or the host can report scores.
            serverID TEXT (FK),  --> Server ID to verify playing match state
            hostID TEXT (FK),    --> Player who requested the match
            clientID TEXT        --> Player who accepted match request
            ^? ClientID needs to be accessible to the whole command.  - will think this through further.

        */

    //creates the database tables if it doesn't exist on first iteration.
    db.run('CREATE TABLE IF NOT EXISTS player (serverID TEXT, playerID TEXT, playerName TEXT, status TEXT, wins UNSIGNED INT, losses UNSIGNED INT, forfeits UNSIGNED INT, PRIMARY KEY(serverID))');
    db.run('CREATE TABLE IF NOT EXISTS match (matchID INT, serverID TEXT, hostID TEXT, clientID TEXT, PRIMARY KEY(matchID))');

    //if the player doesn't exist in the database, create a new record.
    db.get(`SELECT * FROM player WHERE serverID = ${message.guild.id} AND playerID = ${message.author.id}`, function(err, row): void {
      if (!row) {
        db.run('INSERT INTO player VALUES (?, ?, ?, ?, ?, ?, ?, ?)', message.guild.id, message.author.id, message.author.username, 'READY', 0, 0, 0);
        message.channel.send('Since you are new, your stats are at 0 and you are all set up for play.');
      }
    });

    //initialization: command variables
    const em = new Discord.RichEmbed();
    const request = args[0]; //user or moderator request
    const stateupdateUID = args[1]; //moderator request - target UID for state update.

    //processing:

    // User does not give any parameters
    if (!request) {
      //get the user state
      db.get(`SELECT * FROM player WHERE serverID = ${message.guild.id} AND playerID = ${message.author.id}`, function(err, row): void {
        //user state: READY (The player is ready to play, and will enter searching status until an opponent is found, then will matchmake with them.)
        if (row.status == 'READY') {
          db.run(`UPDATE player SET status = "SEARCHING" WHERE serverID = ${message.guild.id} AND playerID = ${message.author.id}`);

          em.setTitle('Searching for matches')
            .setDescription('Other users must react in order to change your game state.  If you react, you will cancel the match!')
            .setColor(message.member.colorRole.color);

          //send a message with a reaction, and listen for a reaction return.  If reaction return comes from the same user, cancel matchmaking, otherwise listen for someone else's reaction and respond.
          message.channel.send(em).then((sentMessage): void => {
            (sentMessage as Discord.Message).react('650775380201832459'); //vs emote

            //===============================================//
            //                  CONTINUE HERE                //
            //===============================================//
            // Player reacts, check for user and see if they're registered, if not register them and set up battle states for both players.
          });
        }

        //user state: DISQUALIFIED (Disqualified from league by either cheating or foul play) - Hopefully this never has to get used.
        else if (row.status == 'DISQUALIFIED') {
          em.setTitle('Sorry, but you are disqualified from this league and therefore cannot request matches.  Please ask a Tournament Organizer/Moderator for help.');
          em.setColor(0xff0000);

          message.channel.send(em);
        }

        //user state: SEARCHING | PLAYING (these player states are invalid and therefore will throw an error.)
        else {
          em.setTitle('You are not in a READY state. Therefore, matchmaking cannot start. Either finish your match or cancel matchmaking.')
            .setDescription('if the command is bugged let a moderator know to reset your game state.  Your match will not count towards your win/loss ratio.')
            .setColor(message.member.colorRole.color);

          message.channel.send(em);
        }
      });
    }

    // User requests a list of stats.
    else if (request == 'stats') {
      //get player data and then pull the information as necessary.
      db.get(`SELECT * FROM player WHERE serverID = ${message.guild.id} AND playerID = ${message.author.id}`, function(err, row): void {
        if (row) {
          em.setTitle('Statistics for player: ' + message.author.username + 'On Server: ' + message.guild.name)
            .setThumbnail(message.author.avatarURL)
            .addField('Wins', row.wins, true)
            .addField('Losses', row.losses, true)
            .addField('Forfeits', row.forfeits, true)
            .addField('Current Status', row.status, false)
            .setColor(message.member.colorRole.color);

          message.channel.send(em);
        }
      });
    }

    //Moderator needs to reset a match.  As a result, the player has to be removed from the playing or searching state.  This can also be used to clear disqualification.
    //probably need to ask for confirmation in this case.  Will double check.
    else if (request == 'reset') {
      if (!message.member.hasPermission('MANAGE_ROLES')) return;
      if (!stateupdateUID) {
        em.setTitle('Error')
          .setDescription('Please add a target user to this setting.')
          .setColor(0xff0000);

        message.channel.send(em);
        return
      }
      db.get(`SELECT * FROM player WHERE serverID = ${message.guild.id} AND playerID = ${message.author.id}`, function(err, row): void {
        if (row.status !== 'READY') {
          db.run(`UPDATE player SET status = "READY" WHERE serverID = ${message.guild.id} AND playerID = ${stateupdateUID}`);
        } 
        else {
          em.setTitle('Player is already in READY state!')
            .setDescription("You can't reset a player already in READY state")
            .setColor(message.member.colorRole.color);
        }

        em.setTitle('League state for member updated')
          .setDescription("User's state has been changed back to READY.  Let them know and continue the fight!")
          .setColor(message.member.colorRole.color);

        message.channel.send(em);
      });
    }

    //Moderator disqualifies a user for cheating or foul play - Hopefully this never has to get used.
    else if (request == 'dq') {
      if (!message.member.hasPermission('MANAGE_ROLES')) return;
      if (!stateupdateUID) {
        em.setTitle('Error')
          .setDescription('Please add a target user to this setting.')
          .setColor(0xff0000);

        message.channel.send(em);
        return
      }
      db.get(`SELECT * FROM player WHERE serverID = ${message.guild.id} AND playerID = ${stateupdateUID}`, function(err, row): void {
        if (row) {
          db.run(`UPDATE player SET status = "DISQUALIFIED" WHERE serverID = ${message.guild.id} AND playerID = ${stateupdateUID}`);
        }

        em.setTitle('League state for member updated')
          .setDescription('User has been disqualified from league.')
          .setColor(message.member.colorRole.color);

        message.channel.send(em);
      });
    }

    else if (request == 'win') {
      db.get(`SELECT * FROM player WHERE playerID = ${message.author.id} AND serverID = ${message.guild.id}`, function(err, row): void {
        if (row.status !== 'PLAYING'){
          em.setTitle('You are not in PLAYING state, therefore you cannot add a win to the player')
            .setDescription('Please start a game with someone and report your game stats to the system once done.')
            .setColor(message.member.colorRole.color)

            message.channel.send(em);
            return;
        }
        else {
          //get both players, add win+1 to winner, add lose+1 to loser, reset player states thereafter.
          db.run(`UPDATE player SET wins = wins + 1 WHERE serverID = ${message.guild.id} AND playerID = ${message.author.id}`);
          db.run(`UPDATE player SET status = "READY" WHERE serverID = ${message.guild.id} AND playerID = ${message.author.id}`);
        }
        em.setTitle('Congratulations, you won the match!')
          .setDescription('Adding your score to the scoreboard')
          .setColor(message.member.colorRole.color);

        message.channel.send(em);
      });
    }

    else if (request == 'lose') {
      db.get(`SELECT * FROM player WHERE playerID = ${message.author.id} AND serverID = ${message.guild.id}`, function(err,row): void {
        if (row.status !== 'PLAYING') {
          em.setTitle('You are not in PLAYING state, therefore you cannot add a loss to the player')
          .setDescription('Please start a game with someone and report your game stats to the system once done.')
          .setColor(message.member.colorRole.color)

          message.channel.send(em);
          return;
        }
        else {
          //get both players, add losses+1 to the loser, and wins+1 to the winner, reset player states thereafter
          db.run(`UPDATE player SET losses = losses + 1 WHERE serverID = ${message.guild.id} AND playerID = ${message.author.id}`);
          db.run(`UPDATE player SET status = "READY" WHERE serverID = ${message.guild.id} AND playerID = ${message.author.id}`);
        }
        em.setTitle('Sorry that you lost the match, better luck next time!')
          .setDescription('Adding your score to the scoreboard')
          .setColor(message.member.colorRole.color);
  
        message.channel.send(em);
      });
    }

    else if (request == 'forfeit') {
      db.get(`SELECT * FROM player WHERE playerID = ${message.author.id} AND serverID = ${message.guild.id}`, function(err,row): void {
        if (row.status !== 'PLAYING') {
          em.setTitle('You are not in PLAYING state, therefore you cannot add a win to the player')
          .setDescription('Please start a game with someone and report your game stats to the system once done.')
          .setColor(message.member.colorRole.color)

          message.channel.send(em);
          return;          
        }
        else {
          //get both players, for forfeiter add forfeits+1 to forfeits, and reset game state for both players.  Winner does not get a win (to be fair.)
          db.run(`UPDATE player SET forfeits = forfeits + 1 WHERE serverID = ${message.guild.id} AND playerID = ${message.author.id}`);
          db.run(`UPDATE player SET status = "READY" WHERE serverID = ${message.guild.id} AND playerID = ${message.author.id}`);
        }
        em.setTitle('Match forfeited. Matchmaking will be reset for both players.')
          .setDescription('Forfeiting will not increase your score towards plays.')
          .setColor(message.member.colorRole.color);

        message.channel.send(em);
      });
    }

  },
};

