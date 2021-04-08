const Discord = require('discord.js')
var fs = require('fs')
var moment = require('moment')

const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')


module.exports.run = async (client, message, args) => {
    // general stuff
    var messageResponse = 'ERROR';
    const user2warn = message.mentions.users.first();
    if (user2warn === undefined) return message.reply("mention a user, using the syntax `$ban <user> [reason]`\nie: `$warn StealthHydrac#8476 being a poopoo`");
    if (user2warn.bot) return message.reply("you can't warn a bot, silly.");
    let uid = user2warn.id;

    // get reason
    if (args.length <= 1) return message.reply("please provide a warn reason.");
    var reason = args.slice(1).join(' ');

    // get datetime
    var date = moment().format('MMMM Do YYYY');

    // connect to db
    var db = new JsonDB(new Config("warns", true, true, '/'));
    var data = db.getData("/");

    if (user2warn === message.author) {
        return message.reply('you can\'t warn yourself, silly.');
    } else if (uid === '411883159408476160' || uid === '301969699258761216') {
        return message.reply(`I think you have the wrong user. ${user2warn.name} is much too cool to be warned.`);
    } else {
        // warn the user
        if (!data.hasOwnProperty(uid)) {
            // add uid to db
            db.push(`/${uid}`, {
                warns:[]
            });
        }

        var warns = db.getData(`/${uid}/warns`);
        warns.push({reason, date});

        db.push(`${uid}`, {
            warns
        });
    }

    return message.reply(messageResponse);
}

//The command's name
module.exports.help = {
  name: "warn",
  description: "Very totally normal warn command."
}