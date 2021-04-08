const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    var messageResponse = '';
    const user2warn = message.mentions.users.first();
    if (user2warn === undefined) return message.reply("mention a user, using the syntax `$ban <user> [reason]`\nie: `$warn StealthHydrac#8476 being a poopoo`");

    return message.reply('no u.');
}

function warnMember(member, level) {

}

//The command's name
module.exports.help = {
  name: "warn",
  description: "Very totally normal warn command using levels & stuffs."
}