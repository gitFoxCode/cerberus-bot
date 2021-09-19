const { parseISO, isValid, minutesToMilliseconds } = require('date-fns')

module.exports = {
    name: "notifications",
    alias: ['powiadomienia', 'notifi'],
    desc: "Ustawia powiadomienie na daną godzine",
    syntax: "[godzina/czas] <text>",
    permissions: [],
    hidden: false,
    execute: async (message, args, client, Discord) => {
        const argTime = args.shift()
        const now = Date.now()
        const text = args.join(" ")

        let time = isValid(parseISO(now + argTime)) ? artTime : false

        if(argTime.includes('m')){
            time = minutesToMilliseconds(argTime.replace('m', ""))
            if(time > 3600000){
                return client.msg(message, {
                    type: 'warning',
                    message: 'Maksymalny czas powiadomienia to 60m',
                    example: 'notifi 10m Zrobić pranie'
                })
            }
        }else{
            return client.msg(message, {
                type: 'blocked',
                message: 'Obecnie działa tylko powiadomienie na minuty',
                example: 'notifi 10m Zrobić pranie'
            })
        }
        if(!time){
            return client.msg(message, {
                type: 'error',
                message: 'Wpisano zły format czasu',
                example: 'notifi 10m Zrobić pranie'
            })
        }

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`${client.botEmojis.get('done')} ${message.author} ustawił powiadomienie: **${text}**: <t:${Math.round((now + time)/1000)}:R>`)
        console.log(now + time,'ms')
            setTimeout(()=>{
                console.log(message.channel)
                const notifiEmbed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setDescription(`🔔🔔🔔 **${text}**`)
                    message.reply({embeds: [notifiEmbed]})
            }, time)
        message.channel.send({ embeds: [embed] })
    }  
}

