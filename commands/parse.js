const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    await message.delete();
    if (args == []) return message.reply("please use the correct syntax `$parse <messageCount>`.");
    
    var messageCount;
    try {
        messageCount = parseInt(args[0], 10)
    } catch (err) {
        return message.reply("please use the correct syntax `$parse <messageCount>`.\nRemember that `messageCount` has to be in an `integer` format.");
    }

    
}

//The command's name
module.exports.help = {
  name: "parse",
  description: "parse messages in bulk."
}