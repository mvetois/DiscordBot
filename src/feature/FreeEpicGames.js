const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

const fetchFreeGames = async () => {
    const res = await axios.get("https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=fr&country=FR&allowCountries=FR");

    if (res.status !== 200)
        return;

    const freeGames = res.data.data.Catalog.searchStore.elements.filter((elem) => (elem.price.totalPrice.discountPrice === 0 && elem.price.totalPrice.discountPrice !== elem.price.totalPrice.originalPrice))
    return (freeGames);
};

const embedGame = (client, game) => {
    const embed = new EmbedBuilder ({
        title: game.title + " - Epic Games",
        description: game.description,
        color: 0x9dfe89,
        image: {url: game.keyImages.find((elem) => (elem.type === "OfferImageWide")).url},
        url: "https://store.epicgames.com/fr/p/" + game.catalogNs.mappings.find((elem) => (elem.pageType === "productHome")).pageSlug,
        thumbnail: {url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Epic_Games_logo.png/527px-Epic_Games_logo.png"}
    });
    const targetChannel = client.channels.cache.get(process.env.CHANNEL_ID);
    targetChannel.send({
        embeds: [ embed ],
        components: [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        style: 4,
                        label: (game.price.totalPrice.originalPrice / 100) + " €",
                        custom_id: "originalPrice",
                        disabled: true
                    },
                    {
                        type: 2,
                        style: 1,
                        custom_id: "discountPrice",
                        label: "Gratuit",
                    },
                    {
                        type: 2,
                        style: 5,
                        label: "Site Epic Games",
                        url: "https://store.epicgames.com/fr/p/" + game.catalogNs.mappings.find((elem) => (elem.pageType === "productHome")).pageSlug
                    }
                ]
            }
        ]
    })
}

const freeGamesEpic = async (client) => {
    const freeGames = await fetchFreeGames();
    embedGame(client, freeGames[0]);
}
module.exports = freeGamesEpic;
