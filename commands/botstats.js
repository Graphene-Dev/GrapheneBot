const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    return message.channel.send("no u")
}

//The command's name
module.exports.help = {
  name: "botstats",
  description: "shows the stats for Graphene bot"
}