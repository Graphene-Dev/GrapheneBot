const Discord = require('discord.js')
var fs = require('fs')

module.exports.run = async (client, message, args) => {
    // connect to the JSON db
    const dir = './assets/todo.json'

    var data = fs.readFileSync(dir)
    var jsondb = JSON.parse(data)

    uid = message.author.id

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