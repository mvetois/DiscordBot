const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./token.json");
const config = require("./config.json");

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

client.on("ready", function () {
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

client.login(token.token);