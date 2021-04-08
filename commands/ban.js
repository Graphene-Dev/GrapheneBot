const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    var messageResponse = '';
    const user2ban = message.mentions.users.first();
    if (user2ban === undefined) return message.reply("mention a user, using the syntax `$ban <user>`\nie: `$ban StealthHydrac#8476`");

    if (user2ban.id === '411883159408476160') {
        messageResponse = 'You cannot ban my daddy. 😠';
    } else if (user2ban.id === '718188351508971542') {
        messageResponse = 'I would love to, but I can\'t. 😟';
    } else if (user2ban.id === '301969699258761216') {
        messageResponse = 'Grant is my daddy, therfor techy is my daddy, so no banning him!';
    } else {
        if (!message.author.hasPermission("BAN_MEMBERS")) return message.reply("You don't have perms! haha");

        user2ban.ban();
        messageResponse = `I have banned ${user2ban.username}`;
    }

    return message.channel.send(messageResponse);
}

//The command's name
module.exports.help = {
  name: "ban",
  description: "Very totally normal ban command."
}