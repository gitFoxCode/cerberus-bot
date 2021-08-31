
const Discord = require('discord.js')

module.exports = async (client) => {
    client.msg = {}
    client.msg = (message, options) => {
        if(typeof options !== "object"){
            throw TypeError("options must be object")
        }else{
            const color = (options.type == "warning") ? "#ffbe19" : "#ed4532"
            const emoji = options.emoji ? options.emoji : options.type
            if(!options.custom){
                options.message = `**${options.message}**`
            }
            const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${client.botEmojis.get(emoji)}\ \ ${options.message}`)
            if(options.example){
                embed.setFooter(`Przykład: ${client.botOptions.get('prefix')}${options.example}`)
            }
            message.channel.send({embeds: [embed]})
        }
    }
    client.processing = {}
    client.processing = (message) => {
        console.log(client.botEmojis.get('processing'))
        const embed = new Discord.MessageEmbed()
            .setColor("#52C44E")
            .setDescription(`${client.botEmojis.get('processing').replace("<", "<a")}\ \ **${message}**`)
        return {embeds: [embed]}
    }
}