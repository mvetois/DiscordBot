const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("../config/token.json");
const config = require("../config/config.json");



const helpEmbed = {
    color: 0x357AB7,
    title: config.messages.help.title,
    fields: [
        {
            name: config.prefix + "Help",
            value: config.messages.help.help,
        },
        {
            name: config.prefix + "Ping",
            value: config.messages.help.ping,
        },
        {
            name: config.prefix + "Clear <" + config.messages.help.clearcmd + ">",
            value: config.messages.help.clear,
        }
    ]
};

client.on("ready", () => {
    console.log("Bot started !");
})

client.on("message", (msg) => {
    var args = msg.content.toLowerCase().split(" ");
    var admin = msg.member.roles.cache.some(role => role.name === config.roles.admin);

    if (args[0] === (config.prefix + "help")) {
        msg.channel.send({ embed: helpEmbed });
    } else if (args[0] === (config.prefix + "ping")) {
        if (admin) {
            msg.react("👌");
            msg.reply("Pong !");
        } else {
            msg.channel.send("Pong !")
        }
        return;
    } else if (args[0] === (config.prefix + "clear")) {
        if (admin) {
            if (!args[1]) {
                msg.reply(config.messages.clear.noArgs);
                return;
            } else if (isNaN(args[1])) {
                msg.reply(config.messages.clear.noDigit);
                return;
            } else if (args[1] > config.config.clear.maxClear) {
                msg.reply(config.messages.clear.maxClear + config.config.clear.maxClear);
                return;
            } else if (args[1] < config.config.clear.minClear) {
                msg.reply(config.messages.clear.minClear + config.config.clear.minClear);
                return;
            }
            msg.channel.messages.fetch({ limit: args[1] }).then(messages => {
                msg.channel.bulkDelete(messages
            )});
        } else {
            msg.delete();
        }
        return;
    }
})

client.on("guildMemberAdd", (member) => {
    const channel = member.guild.channels.cache.find(channel => channel.name === config.channel.logJoinLeave);

    if(!channel)
        return;
    const welcomeEmbed = new Discord.MessageEmbed()
        .setColor(config.messages.joinLeave.joinColor)
        .setAuthor(member.user.tag, member.user.displayAvatarURL(),)
        .setTitle(config.messages.joinLeave.joinTitle)
        .setDescription(`${member} ${config.messages.joinLeave.joinMessage}`)
        .setTimestamp();
    channel.send(welcomeEmbed);
});

client.on("guildMemberRemove", (member) => {
    const channel = member.guild.channels.cache.find(channel => channel.name === config.channel.logJoinLeave);

    if(!channel)
        return;
    const byeEmbed = new Discord.MessageEmbed()
        .setColor(config.messages.joinLeave.leaveColor)
        .setAuthor(member.user.tag, member.user.displayAvatarURL(),)
        .setTitle(config.messages.joinLeave.leaveTitle)
        .setDescription(`${member} ${config.messages.joinLeave.leaveMessage}`)
        .setTimestamp();
    channel.send(byeEmbed);
});

client.on("messageUpdate", (oldMessage, newMessage) => {
    const channel = oldMessage.guild.channels.cache.find(channel => channel.name === config.channel.logMessages);

    if(!channel || oldMessage.content == newMessage.content)
        return;
    const editEmbed = new Discord.MessageEmbed()
        .setColor(config.messages.editDelete.messageChangeColor)
        .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL(),)
        .setTitle(config.messages.editDelete.messageChangeTitle + " #" + oldMessage.channel.name)
        .addFields(
            {name: config.messages.editDelete.messageChangeBefore, value: oldMessage},
            {name: config.messages.editDelete.messageChangeAfter, value: newMessage},
        )
        .setTimestamp();
    channel.send(editEmbed);
});

client.on("messageDelete", (message) => {
    const channel = message.guild.channels.cache.find(channel => channel.name === config.channel.logMessages);

    if(!channel)
        return;
    const delEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor(config.messages.editDelete.messageDeleteColor)
    .setTitle(config.messages.editDelete.messageDeleteTitle + " #" + message.channel.name)
    .addField(config.messages.editDelete.messageDeleteDelete, message.content)
    .setTimestamp();
    channel.send(delEmbed);
})

client.login(token.token);