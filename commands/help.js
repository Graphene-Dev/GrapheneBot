const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  let helpEmbed = new Discord.MessageEmbed()
      .setColor('#0027b3')
      .setTitle('Help')
      .setDescription('The prefix for this bot is `$`.')
      .setTimestamp()
      .setFooter('Graphene Bot', 'https://i.imgur.com/UN5265k.jpg');

  if (args.length === 0) {
    helpEmbed.addFields(
        { 
          name: 'Help:', 
          value: 'This command dumb dumb'
        },
        { 
          name: 'Value:', 
          value: 'Get the current value of the blockchain' 
        },
        {
          name: 'Google:',
          value: 'Get a google query'
        },
        { 
          name: '\u200B', 
          value: 'To get more information about a command, run `$help <command name>`.' 
        }

      );
  } else {
    try {
      helpEmbed.addField(
          `${args[0]}:`, 
          client.commands.get(args[0]).help.description, // this may/may not work.
          false
        );
    } catch (err) {
      console.error("Help command -- Invalid args");
      return message.channel.send(`Sorry ${message.author}, but ${args[0]} does not seem to be a valid command.`);
    }
  }

  return message.channel.send(helpEmbed);
}

//The command's name
module.exports.help = {
  name: "help",
  description: "bro you know what this command does :/"
}
