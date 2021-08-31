
module.exports = async (client) => {
    const guild = client.guilds.cache.get("881848759959572510")
    guild.emojis.fetch()
    .then(emojis => {
        client.botEmojis = new Map()
        emojis.forEach(emoji => {
            client.botEmojis.set(emoji.name, `<:${emoji.name}:${emoji.id}>`)
        })
        console.log(`[*] Downloaded ${emojis.size} emojis.`)
    }).catch(console.error)
}