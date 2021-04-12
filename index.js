//ModMail bot by legend >:D
const Client = require('./Structures/legendJsClient.js');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const config = require('./config.json');
//dont touch the credits or i will find you and u will have to commit die >:D
const client = new Client({
	disableMentions: 'everyone'
});

console.log('-------------------------------------');
console.log(`
██╗     ███████╗ ██████╗ ███████╗███╗   ██╗██████╗         ██╗███████╗
██║     ██╔════╝██╔════╝ ██╔════╝████╗  ██║██╔══██╗        ██║██╔════╝
██║     █████╗  ██║  ███╗█████╗  ██╔██╗ ██║██║  ██║        ██║███████╗
██║     ██╔══╝  ██║   ██║██╔══╝  ██║╚██╗██║██║  ██║   ██   ██║╚════██║
███████╗███████╗╚██████╔╝███████╗██║ ╚████║██████╔╝██╗╚█████╔╝███████║
╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝ ╚════╝ ╚══════╝
`);

console.log('-------------------------------------');
console.log(
	'[CREDITS]: made by legend-js | https://github.com/legend-js-dev | LΣGΣПD#0001'
);
console.log('-------------------------------------');
//this took me some time so dont you dare remove credits, if u do remove credits then you will have copy right issues.
client.on('ready', () => {
	console.log(`[INFO]: Ready on client (${client.user.tag})`);
	console.log(
		`[INFO]: watching ${client.guilds.cache.size} Servers, ${
			client.channels.cache.size
		} channels & ${client.users.cache.size} users`
	);
	console.log('-------------------------------------');
	client.user.setActivity('ModMail bot by legend :D', {
		type: 'WATCHING'
	});
});

client.on("message", async message => {
  if (message.channel.type === "dm") {
  if (message.author.bot) return;
  let category = client.channels.cache.get(config.categoryID);
  if (!category) return;
  let guild = client.guilds.cache.get(config.guildID);
  if (!guild) return;
  let attachs = [];
  if (message.attachments.size) {
message.attachments.forEach(attach => attachs.push({ name: attach.name, attachment: attach.url }))
  }
  if (!guild.channels.cache.find(c => c.name === message.author.id)) {
  let chan = await guild.channels.create(`${message.author.id}`, { topic: `User: ${message.author.tag} | ${message.author.id}`, parent: category })
  const Discord = require("discord.js");
  let embed = new Discord.MessageEmbed()
  .setTitle(`ModMail`)
  .addField(`User`, message.author.tag)
  .setDescription(`**New ModMail.**`)
  .setThumbnail(message.author.displayAvatarURL())
  .setTimestamp()
  .setFooter(message.author.tag + " Made By LΣGΣПD#0001", message.author.displayAvatarURL())
  chan.send({ embed: embed })
  chan.createWebhook(message.author.username, {
  avatar: message.author.displayAvatarURL(),
  reason: 'ModMail'
}).then(async lol => {
let hooks = await chan.fetchWebhooks();
let hook = hooks.first();
hook.send(message.content ? message.content : null, {
    files: attachs
  })
})
  } else {
    let chan = guild.channels.cache.find(c => c.name === message.author.id);
    if (!chan) return;
    let hooks = await chan.fetchWebhooks();
    let hook = hooks.first();
hook.send(message.content ? message.content : null, {
    files: attachs
  })
  }
  } else {
    if (client.users.cache.get(message.channel.name) && !message.author.bot) {
    let user = client.users.cache.get(message.channel.name);
    let attachs = [];
    if (message.attachments.size) {
message.attachments.forEach(attach => attachs.push({ name: attach.name, attachment: attach.url }))
  }
  if (message.content.toLowerCase().startsWith("pls close")) {
  let reason = message.content.slice(9);
  if (!reason) reason = "None";
  message.channel.send(`**The modmail has been closed with the reason: ${reason}, deleteing this channel in 10 Seconds...**`);
  message.channel.setName("closed").catch(err => undefined);
  setTimeout(() => {
    message.channel.delete().catch(err => undefined);
  }, 10000)
  return user.send(`**The modmail has been closed by ${message.author.tag} with the reason - ${reason} - To open it again you may DM me.**`);
  } else {
  return user.send(message.content ? message.content : null, {
    files: attachs
  });
  }
  }
  }
})

client.login(token).catch(err => {
	console.log('[ERROR]: Invalid Token Provided');
});
