const cron = require("node-cron");
const freeGamesEpic = require("../feature/FreeEpicGames");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log("Ready! Logged in as " + client.user.tag);
        cron.schedule("5 17 * * 4", () => {
            freeGamesEpic(client);
        }, {scheduled: true, timezone: "Europe/Paris"}).start();

    },
};