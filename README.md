# DiscordBot

A simple Discord bot announcing all new free games on the Epic Games Store (and more, in the future ... ).


![GitHub](https://img.shields.io/github/license/mvetois/DiscordBot?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/mvetois/DiscordBot?style=flat-square)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed-raw/mvetois/DiscordBot?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues-raw/mvetois/DiscordBot?style=flat-square)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/mvetois/DiscordBot?style=flat-square)

## How to configure

Create a `.env` file in the root directory of your project.
This file store the environment values that will be needed to back up the database. Here are the values that must be added to the file :


```dosini
TOKEN=          # Discord bot token
CLIENT_ID=      # Discord client id
GUILD_ID=       # Discord server id
CHANNEL_ID=     # Discord channel id
```

## How to run

To start the project, you will first need to install all dependencies load all commands and start the project :

```bash
# Install dependencies
$> npm install

# Load all commands
$> npm load

# Start the project
$> npm start
```
If you want to relaunch the project several times, it is not necessary to reinstall the dependencies each time

## Special thanks

Thanks to [@Theo](https://github.com/theo-mazars) for the idea of the bot !
