const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  let helpEmbed = new Discord.MessageEmbed()
      .setColor('#0027b3')
      .setTitle('Help')
      .setDescription('The prefix for this bot is `$`.')
      .setTimestamp()
      .setFooter('Graphene Bot', 'https://i.imgur.com/wSTFkRM.png') // update this image when stealth sends me it

  if (typeof(args) === "undefined") {
    helpEmbed.addFields(
        { 
          name: 'Help:', 
          value: 'This command dumb dumb'
        },
        { 
          name: 'todo:', 
          value: 'Add and remove tasks for yourself' 
        },
        { 
          name: 'Value:', 
          value: 'Get the current value of the blockchain' 
        },
        { 
          name: '\u200B', 
          value: 'To get more information about a command, run `$help <command name>`.' 
        }

      )
  } else {
    try {
      helpEmbed.addField(
          `${args[0]}:`, 
          client.commands.get(args[0]).help.description, // this may/may not work.
          false
        )
    } catch (err) {
      console.error(err)
      return message.channel.send(`Sorry ${message.author}, but ${args[0]} does not seem to be a valid command.`)
    }
  }

  return message.channel.send(helpEmbed)
}

//The command's name
module.exports.help = {
  name: "help",
  description: "bro you know what this command does :/"
}