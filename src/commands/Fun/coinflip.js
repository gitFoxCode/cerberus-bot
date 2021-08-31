module.exports = {
    name: "coinflip",
    alias: [],
    desc: "Rzut monetą",
    syntax: "",
    permissions: [],
    hidden: false,
    execute: async (message, args, client, Discord) => {
        let coinflip = (Math.floor(Math.random() * 2) == 0)
        let coin = coinflip ? "Orzeł" : "Reszka"
        console.log(client.botEmojis.get('cointail'))
        const embed = new Discord.MessageEmbed()
            .setColor((coinflip ? '#0373fc' : '#fc033d'))
            .setImage(coinflip ? `https://cdn.discordapp.com/emojis/${client.botEmojis.get('cointail').match(/\d+/gi)[0]}` : `https://cdn.discordapp.com/emojis/${client.botEmojis.get('coinhead').match(/\d+/gi)[0]}`)
            .setTitle(`${coin}`)
        message.channel.send({embeds: [embed]})
    }  
}