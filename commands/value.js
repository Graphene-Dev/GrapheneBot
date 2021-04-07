const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    // gonna have to work on this command when there is actual value lol
    let val = getVal().toString();
    return message.reply(`our value is currently $${val}.`);
}

function getVal() {
    // get the value from the api
    return 0
}

//The command's name
module.exports.help = {
  name: "value",
  description: "Shows the current blockchain value."
}
