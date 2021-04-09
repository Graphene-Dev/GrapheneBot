const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    let url = `https://www.google.com/search?q=${args.join("+")}`

    const googleEmbed = new Discord.MessageEmbed()
        .setColor('#0027b3')
        .setTitle('Google it.')
        .setURL(url)
        .setImage('https://tenor.com/view/google-type-work-logo-gif-17037183')
        .setTimestamp()
        .setFooter('Graphene Bot', 'https://i.imgur.com/UN5265k.jpg');

    return message.channel.send(googleEmbed);
}

//The command's name
module.exports.help = {
  name: "google",
  description: "google it."
}