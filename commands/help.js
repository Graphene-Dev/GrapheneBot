const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  return message.reply("no");
}

//The command's name
module.exports.help = {
  name: "help"
}