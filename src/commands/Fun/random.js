module.exports = {
    name: "random",
    alias: [],
    desc: "Losowa liczba od x do y",
    syntax: "[x] [y]",
    permissions: [],
    hidden: false,
    execute: async (message, args, client, Discord) => {
        if(!isNaN(args[0]) && !isNaN(args[1])){
            if(args[0] > args[1]){
                return client.msg(message, {type: "warning", message: "Pierwsza liczba powinna być mniejsza niż druga"})
            }else{
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`🎲 Wylosowana liczba: **${Math.floor(Math.random() * (+args[1] - +args[0]) + +args[0])}**`)
                message.channel.send({embeds: [embed]})
            }
        }else{
            return client.msg(message, {
                type: "warning", 
                message: "Źle wpisano komendę, wpisz liczbę od X do Y",
                example: "random 0 100"
            })
        }
    }  
}
