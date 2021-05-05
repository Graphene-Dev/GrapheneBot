const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    var messageCount = parseInt(args[0], 10);

    if (!messageCount) return message.reply("please use the correct syntax `$parse <messageCount>`.");
    if (messageCount < 1 || messageCount > 100) return message.reply("please use the correct syntax `$parse <messageCount>`.\nRemeber, `messageCount` must be an `integer value between 1 and 100.");

    message.channel.bulkDelete(messageCount + 1)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}

//The command's name
module.exports.help = {
  name: "parse",
  description: "parse messages in bulk."
}