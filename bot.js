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
  if (messageDelete.bot || messageDelete.author.tag === "GitHub#0000" || messageDelete.author.tag === "Rythm#3722") return;

  var messageText;
  if (messageDelete.content.length > 800) {
    messageText = `${messageDelete.content.substring(0, 800)}...`;
  } else {
    messageText = messageDelete.content;
  }
  
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
          value: `\`\`\`\n${messageText}\n\`\`\``
        }
      );

  client.channels.cache
    .get("836366149486641172")
    .send(deleteEmbed);
});

client.on('messageUpdate', function(oldMessage, newMessage){
  if (newMessage.bot || newMessage.author.tag === "GitHub#0000" || newMessage.author.tag === "Rythm#3722") return;

  var oldMessageText;
  if (oldMessage.content.length > 475) {
    oldMessageText = `${oldMessage.content.substring(0, 475)}...`;
  } else {
    oldMessageText = oldMessage.content;
  }

  var newMessageText;
  if (newMessage.content.length > 475) {
    newMessageText = `${newMessage.content.substring(0, 475)}...`;
  } else {
    newMessageText = newMessage.content;
  }

  let editEmbed = new Discord.MessageEmbed()
    .setColor('#d9990f')
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
          value: `\`\`\`\n${oldMessageText}\n\`\`\``
        },
        {
          name: 'New Message:',
          value: `\`\`\`\n${newMessageText}\n\`\`\``
        }
      );

  client.channels.cache
    .get("836366149486641172")
    .send(editEmbed);
});

client.on("guildMemberAdd", function(member){
  console.info(`New member: ${member.tag}`);

  var joinMessages = [
      `Whalecum, ${member}!`,
      `Com'on over and mine some Graphene, ${member}!`,
      `Welcome to Graphene, ${member} ||we take bribes. At our patreon.||`, //TODO: add link to patreon
      `Welcome ${member} this discord has great quotes, just like this one:\n> Come support our patreon and remeber, by paying us, you're just paying yourself!\n-- Techyguy 2021`
    ]

  client.channels.cache
    .get("825457139467550801")
    .send(joinMessages[Math.floor(Math.random() * joinMessages.length)]);
});

client.login(TOKEN);
