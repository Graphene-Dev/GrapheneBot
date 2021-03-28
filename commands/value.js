const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    // gonna have to work on this command when there is actual value lol
    return message.reply("our value is currently $0.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000.");
}

//The command's name
module.exports.help = {
  name: "todo"
}