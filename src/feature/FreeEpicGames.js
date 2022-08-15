const axios = require("axios");
const { EmbedBuilder } = require("discord.js");
const { captureRejectionSymbol } = require("events");


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
        url: "https://store.epicgames.com/fr/p/" + game.catalogNs.mappings.find((elem) => (elem.pageType === "productHome")).pageSlug
    });
    const targetChannel = client.channels.cache.get(process.env.CHANNEL_ID);
    targetChannel.send({
        embeds: [ embed ],
        components: [
            {
                type: 1,
                components: [
                    {
                        style: 1,
                        label: (game.price.totalPrice.originalPrice / 100) + "€",
                        custom_id: "row_0_button_0",
                        disabled: true,
                        type: 2
                    },
                    {
                        style: 3,
                        label: "Gratuit",
                        custom_id: "row_0_button_1",
                        disabled: false,
                        type: 2
                    },
                    {
                        type: 2,
                        style: 5,
                        label: "Obtenir",
                        url: "https://store.epicgames.com/fr/p/" + game.catalogNs.mappings.find((elem) => (elem.pageType === "productHome")).pageSlug
                    },
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
