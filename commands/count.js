const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    const guild = client.guilds.get("825457139023347733");
    var memberCount = guild.members.filter(member => !member.user.bot).size;

    return message.channel.send(`the current member count for the Graphene Discord is: ${memberCount}`)
}

//The command's name
module.exports.help = {
  name: "count",
  description: "Get the current member count for the server."
}