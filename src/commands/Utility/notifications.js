//const { parseISO, isValid, minutesToMilliseconds } = require('date-fns')
const parse = require('parse-duration')

module.exports = {
    name: "notifications",
    alias: ['powiadomienia', 'notifi', 'n'],
    desc: "Ustawia powiadomienie na daną godzine",
    syntax: "[godzina/czas] \"<text>\"",
    permissions: [],
    hidden: false,
    execute: async (message, args, client, Discord) => {
        let arguments = args.join(" ")
        const now = Date.now()

        if(arguments.trim() == ""){
            return client.msg(message, {
                type: 'error',
                message: 'Wprowadź poprawne argumenty',
                example: 'notifi 10m "Zrobić pranie"'
            })
        }

        if(!/.+".+\"/.test(arguments)){
            return client.msg(message, {
                type: 'warning',
                message: 'Musisz w cudzysłowie wpisać tekst powiadomienia',
                example: 'notifi 10m "Zrobić pranie"'
            })
        }

        arguments = arguments.split(`"`).slice(0, -1)

        if(arguments.length > 2){
            console.log(arguments)
            return client.msg(message, {
                type: 'warning',
                message: 'Można użyć tylko dwóch znaków cudzysłow w powiadomeniu',
                example: 'notifi 10m "Zrobić pranie"'
            })
        }

        let time = arguments[0]
        let notification = arguments[1]

        const timeMs = parse(time)

        if(isNaN(timeMs)){
            return client.msg(message, {
                type: 'warning',
                message: `Źle wprowadzono jednostkę czasu: ${time}`,
                example: 'notifi 10m "Zrobić pranie"'
            })
        }

        if(timeMs > 18000000){
            return client.msg(message, {
                type: 'blocked',
                message: `Maksymalny czas powiadomienia to 5 godzin.`
            })
        }

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`${client.botEmojis.get('done')} ${message.author} ustawił powiadomienie: **${notification}**: <t:${Math.round((now + timeMs)/1000)}:R>`)
            setTimeout(()=>{
                const notifiEmbed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setDescription(`🔔🔔🔔 **${notification}**`)
                    message.reply({embeds: [notifiEmbed]})
            }, timeMs)
        message.channel.send({ embeds: [embed] })
    }  
}

