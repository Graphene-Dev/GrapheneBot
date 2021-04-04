const Discord = require('discord.js')
var fs = require('fs')

const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

module.exports.run = async (client, message, args) => {
    var db = new JsonDB(new Config("todo", true, true, '/'));
    var data = db.getData("/")

    var uid = message.author.id

    if (args[0] === 'add' || args[0] === '+') {
        if (!data.hasOwnProperty(uid)) {
            // add the uid to db
        }
    } else if (args[0] === 'remove' || args[0] === 'done' || args[0] === '-') {
        if (!data.hasOwnProperty(uid)) {
            // then there is nothing to remove
            return message.reply("you have no active tasks.")
        }
        // remove it.
    } else {
        if (!data.hasOwnProperty(uid)) {
            return message.reply("you have no active tasks.")
        }

    }

    return
}

//The command's name
module.exports.help = {
  name: "todo",
  description: "Command for managing tasks.\nUsage:\nTo add a task: `$todo add <task`\nTo remove a task: `$todo remove <task number>`\nTo list tasks: `$todo`"
}
