module.exports = {
    name: "ping",
    alias: ['latency'],
    desc: "Sprawdza czas odpowiedzi bota",
    syntax: "",
    permissions: [],
    hidden: false,
    execute: async (message, args, client, Discord) => {
        try{
            const msg = await message.channel.send("Czekaj...")
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`🏓 **Pong**!`)
                .addField("⌛ Opóźnienie", `**${msg.createdTimestamp -  message.createdTimestamp}ms**`, true)
                .addField("🤖 API", `**${Math.round(client.ws.ping)}ms**`, true)
            msg.delete()
            return message.channel.send({embeds: [embed]})
        }catch(err){
            console.error(err)
        }
    }  
}
