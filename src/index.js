const fs = require("node:fs")
const path = require("node:path")
const { Client, Collection, GatewayIntentBits } = require("discord.js")
const dotenv = require("dotenv")
dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync(path.join(__dirname, "events")).filter(file => file.endsWith(".js"));

client.commands = new Collection();

for (const file of commandFiles) {
    const filePath = path.join(path.join(__dirname, "commands"), file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
    const filePath = path.join(path.join(__dirname, "events"), file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

client.login(process.env.TOKEN);