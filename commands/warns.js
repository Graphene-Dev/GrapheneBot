const Discord = require('discord.js')
var fs = require('fs')
var moment = require('moment')

const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

module.exports.run = async (client, message, args) => {
    // general stuff
    const user4warn = message.mentions.users.first();
    if (user4warn === undefined) return message.reply("mention a user, using the syntax `$warns <user> [page]`\nie: `$warns @StealthHydrac#8476 1`");
    uid = user4warn.id

    let warnsEmbed = new Discord.MessageEmbed()
      .setColor('#0027b3')
      .setTitle('Warns')
      .setDescription(`A list of infractions for user ${user4warn}.`)
      .setTimestamp()
      .setFooter('Graphene Bot', 'https://i.imgur.com/UN5265k.jpg')

    // connect to db
    var db = new JsonDB(new Config("warns", true, true, '/'));
    try {
        var data = db.getData(`/${uid}/warns`);
    } catch (err) {
        return message.reply(`I could not find any warns/infractions for ${user4warn}.`)
    }

    var from = 0;
    var to = data.length;
    if (args.length <= 1 && data.length > 4) {
        to = 4;
    } else {

    }
}


//The command's name
module.exports.help = {
  name: "warns",
  description: "Displays a user's warns."
}