require('dotenv').config();
const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const TOKEN = process.env.TOKEN;

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.error("Couldn't find commands.");
      return;
    }
  
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.info(`${f} loaded!`);
    client.commands.set(props.help.name, props);
  });
  
});

client.on('ready', () => {
  console.info(`\nLogged in as ${client.user.tag}!\n`);

  client.user.setPresence({ activity: { name: 'Graphene Development' }, status: 'online' })
    .then(console.info)
    .catch(console.error);

  console.log("\n+------------------------------------+");
  console.log("|            GrapheneBot             |");
  console.log("|            Grant Bourne            |");
  console.log("|  (https://github.com/GrantBGreat)  |");
  console.log("+------------------------------------+");
});

var cooldown = false;
client.on('message', message => {
  // General checks:
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  if (cooldown == true) {
    //bot is on cooldown
    console.warn("Bot is on cooldown.")
    let cooldownEmbed = new Discord.MessageEmbed()
      .setColor('#8f0707')
      .setTitle('Cooldown')
      .setDescription('You are still on 2 second cooldown!\nStop spamming, 🆔!')
    return message.channel.send(cooldownEmbed)
  } else {
    // bot is not on cooldown, continue
    // Common vars
    let content = message.content.split(" ");
    let command = content[0].toLowerCase();
    //console.log(`running command ${command}`)
    let args = content.slice(1);
    let prefix = "$";

    if (command.substring(0,1) != prefix) return;

    // Checks if message contains a command and runs it
    let commandfile = client.commands.get(command.slice(prefix.length));
    if(commandfile) {
      commandfile.run(client,message,args)
      cooldown = true;
      setTimeout(() => {
        cooldown = false
      }, 2000); //Timeout for 2 seconds
    } else {
      console.warn(`Command ${command.slice(prefix.length)} does not exist.`)
    }
  }
});


////////////////////////////////////////////////LOGGING EVENTS////////////////////////////////////////////////


client.on("messageDelete", function(messageDelete){
  if (messageDelete.bot) return;
  
  let deleteEmbed = new Discord.MessageEmbed()
    .setColor('#a80f0f')
    .setTitle('Message Deleted')
    .setTimestamp()
    .setFooter('Graphene Bot', 'https://i.imgur.com/UN5265k.jpg')
    .addFields(
        { 
          name: 'Channel:', 
          value: `${messageDelete.guild.channels.cache.get(`${messageDelete.channel.id}`).toString()}`
        },
        { 
          name: 'User:',
          value: `${messageDelete.author.tag} [${messageDelete.author.id}]` 
        },
        {
          name: 'Message:',
          value: `\`\`\`\n${messageDelete.content}\n\`\`\``
        }
      );

  client.channels.cache
    .get("836366149486641172")
    .send(deleteEmbed);
});

client.on('messageUpdate', function(oldMessage, newMessage){
  if (newMessage.bot) return;

  try {
    let editEmbed = new Discord.MessageEmbed()
      .setColor('#0027b3')
      .setTitle('Message Deleted')
      .setURL(`${newMessage.url}`)
      .setTimestamp()
      .setFooter('Graphene Bot', 'https://i.imgur.com/UN5265k.jpg')
      .addFields(
          { 
            name: 'Channel:', 
            value: `${newMessage.guild.channels.cache.get(`${newMessage.channel.id}`).toString()}`
          },
          { 
            name: 'User:',
            value: `${newMessage.author.tag} [${newMessage.author.id}]` 
          },
          {
            name: 'Old Message:',
            value: `\`\`\`\n${oldMessage.content}\n\`\`\``
          },
          {
            name: 'New Message:',
            value: `\`\`\`\n${newMessage.content}\n\`\`\``
          }
        );
    } catch (err) {
      console.error("ERROR in message edit logging, this is most likely because of a long message");
      console.error(err);
      return;
    }

  client.channels.cache
    .get("836366149486641172")
    .send(editEmbed);
});

client.login(TOKEN);
