const urban = require('relevant-urban')

module.exports = {
    name: "urbandictionary",
    alias: ['urban'],
    desc: "Informacje na temat 'urban' słów",
    syntax: "[słowo]",
    permissions: [],
    hidden: false,
    execute: async (message, args, client, Discord) => {
        if(!args[0]) return client.msg({type: "warning", message: "Wpisz cokolwiek do wyszukiwania", example: "urban brainwashing"})

        try{
            const res = await urban(escape(args.join(' ')))
            if (!res) return client.msg({type: "error", message: "Nie znalazłem nic na ten temat..."})
            const { word, urbanURL, definition, example, thumbsUp, thumbsDown, author } = res

            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`Słowo - ${word}`)
                .setDescription(`**Definicja:**\n*${definition || "Brak definicji"}*\n\n**Przykład:**\n*${example || "Brak przykładu"}*`)
                .addField('**Ocena:**', `**\`Upvotes: ${thumbsUp} | Downvotes: ${thumbsDown}\`**`, true)
                .addField("**Link**",  `[link to ${word}](${urbanURL})`, true)
                .addField("**Autor:**", `${author || "nieznany"}`, true)
                .setTimestamp()
            message.channel.send({embeds: [embed]}) 
        }catch(err){
            return client.msg(message, {
                type: 'error',
                message: `Wprowadzono niepoprawne znaki`
            })
        }
    }  
}