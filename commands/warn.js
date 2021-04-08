const Discord = require('discord.js')
var fs = require('fs')

const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')


module.exports.run = async (client, message, args) => {
    // general checks
    var messageResponse = '';
    const user2warn = message.mentions.users.first();
    if (user2warn === undefined) return message.reply("mention a user, using the syntax `$ban <user> [reason]`\nie: `$warn StealthHydrac#8476 being a poopoo`");

    // connect to db
    var db = new JsonDB(new Config("warns", true, true, '/'));
    var data = db.getData("/");

    if (user2warn === message.author) {
        return message.reply('you can\'t warn yourself, silly.')
    } else if (user2warn.id === '411883159408476160' || user2warn.id === '301969699258761216') {
        return message.reply(`I think you have the wrong user. ${user2warn.name} is much too cool to be warned.`)
    } else {
        // warn the user

    }

    return message.reply('no u.');
}

//The command's name
module.exports.help = {
  name: "warn",
  description: "Very totally normal warn command."
}