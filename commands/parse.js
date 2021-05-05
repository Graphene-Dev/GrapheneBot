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

    message.channel.bulkDelete(messageCount + 1).catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}

//The command's name
module.exports.help = {
  name: "parse",
  description: "parse messages in bulk."
}