const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./token.json");
const config = require("./config.json");

client.token = token;
client.config = config;

client.on("ready", function () {
    console.log("Bot started !");
})

client.on("message", (msg) => {
    var args = msg.content.toLowerCase().split(" ");
    var admin = msg.member.roles.cache.some(role => role.name === client.config.roles.admin);

    if (args[0] === (client.config.prefix + "ping")) {
        if (admin) {
            msg.react("👌");
            msg.reply("Pong !");
        } else {
            msg.channel.send("Pong !")
        }
        return;
    }
})

client.login(client.token.token);