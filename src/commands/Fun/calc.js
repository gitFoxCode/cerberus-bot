const { evaluate } = require('mathjs')

module.exports = {
    name: "calc",
    alias: [],
    desc: "Kalkulator",
    syntax: "",
    permissions: [],
    hidden: false,
    execute: async (message, args, client, Discord) => {
        try{
            let math = evaluate(args.join(" "))
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`🧮 Wynik to: **${math}**`)
            message.channel.send({embeds: [embed]}) 
        }catch(err){
            return client.msg(message, {
                type: 'warning',
                message: `**${args.join(" ")}**? Nie wiem co to oznacza.`,
                custom: true
            })
        }
    }  
}
