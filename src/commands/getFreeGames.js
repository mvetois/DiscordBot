const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

const fetchFreeGames = async () => {
    const res = await axios.get("https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=fr&country=FR&allowCountries=FR");

    if (res.status !== 200)
        return null;

    const freeGames = res.data.data.Catalog.searchStore.elements.filter((elem) => (elem.price.totalPrice.discountPrice === 0 && elem.price.totalPrice.discountPrice !== elem.price.totalPrice.originalPrice))
    return (freeGames);
};

const embedGame = (interaction, games) => {
    const embed = [];
    for (const game of games) {
        embed.push(new EmbedBuilder ({
            title: game.title + " - Epic Games",
            description: game.description,
            color: 0x9dfe89,
            image: {url: game.keyImages.find((elem) => (elem.type === "OfferImageWide")).url},
            url: "https://store.epicgames.com/fr/p/" + game.catalogNs.mappings.find((elem) => (elem.pageType === "productHome")).pageSlug,
            thumbnail: {url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Epic_Games_logo.png/527px-Epic_Games_logo.png"}
        }))
    }
    interaction.reply({
        embeds: embed,
    })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("freegames")
        .setDescription("Get the free games of the week"),
    async execute(interaction) {
        const freeGames = await fetchFreeGames();
        if (freeGames === null || freeGames.length === 0)
            return interaction.reply("No free games this week");
        embedGame(interaction, freeGames);
    }
};

