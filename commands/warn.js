const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    return message.reply('no u.');
}

//The command's name
module.exports.help = {
  name: "warn",
  description: "Very totally normal warn command using levels & stuffs."
}