const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if(message.author.id != "411883159408476160" && message.author.id != "301969699258761216" && message.author.id != "718188351508971542") {
        return message.reply("you ain't cool enough to use this command.\nhaha");
    } else {
    var result = args.join(" ");
        let evaled = eval(result);
        console.warn(`${message.author.tag} running eval command:`);
        console.log(`Input: ${result}`);
        console.log(`Output: ${evaled}`);

        // message.channel.send(`result:\n${evaled}`) // <-- to send without an embed
        const evalEmbed = new Discord.MessageEmbed()
            .setColor('#0027b3')
            .setTitle('Evaluation')
            .setDescription(`Input:\n\`\`\`js\n${result}\n\`\`\`\nOutput:\n\`\`\`\n${evaled}\n\`\`\``)
            .setTimestamp()
            .setFooter('Evaluated by Graphene Bot', 'https://i.imgur.com/UN5265k.jpg');

        return message.channel.send(evalEmbed);
    }
}

//name this whatever the command name is.
module.exports.help = {
  name: "eval",
  description: "Evaluate JS code -- can only be used by certain people."
}