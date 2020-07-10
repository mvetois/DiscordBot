const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./token.json");

client.token = token;

client.on("ready", function () {
    console.log("Bot started !");
})

client.login(client.token.token);