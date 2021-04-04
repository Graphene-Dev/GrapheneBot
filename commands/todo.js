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
            db.push(`/${uid}`, {
                tasks:[]
            });
        }

        var task = args.slice(1).join(' ')
        if (task.length >= 80) return message.reply("try writing a shorter task.")
        if (db.getData(`/${uid}`).tasks.length > 10) return message.reply("you have too many tasks, try completing the ones you have first.")
        
        db.push(`/${uid}`, {
            tasks:[
                task
            ]
        }, false);

        return message.channel.send(`I have added \`${task}\` to your list of tasks.`)

    } else if (args[0] === 'remove' || args[0] === 'done' || args[0] === '-') {
        if (!data.hasOwnProperty(uid)) {
            // then there is nothing to remove
            return message.reply("you have no active tasks.")
        }
        // remove it.
        var tasknum = args[1]
        var task2remove = db.getData(`/${uid}/`).tasks[tasknum]

        db.delete(`/${uid}/tasks/${task2remove}`)

        return message.channel.send(`I have removed \`${task2remove}\` from your list of tasks.`)
    } else {
        if (!data.hasOwnProperty(uid)) {
            return message.reply("you have no active tasks.")
        }
        var userTasks = db.getData(`/${uid}`).tasks

        for (var i = 0; i<userTasks.length; i++) {
            userTasks[i] = `\`${i+1}\`: ${userTasks[i]}`
        }

        return message.channel.send(userTasks)
    }

    return
}

//The command's name
module.exports.help = {
  name: "todo",
  description: "Command for managing tasks.\nUsage:\nTo add a task: `$todo add <task`\nTo remove a task: `$todo remove <task number>`\nTo list tasks: `$todo`"
}
