module.exports = {
    name: "config",
    alias: ['options'],
    desc: "Ustawienia bota dla serwera",
    syntax: "<options>",
    permissions: ['admin'],
    hidden: false,
    execute: async (message, args, client, Discord) => {
        const guild = client.guilds.cache.get(message.guildId)
        console.log(guild)
        //TODO: dokończyć ustawienia
        if(args.length == 0){
            const embed = await new Discord.MessageEmbed()
                .setAuthor('Opcje serwera', 'https://cdn.discordapp.com/icons/879805168185663568/2e33c5ced314138519239af6c154403f.png')
                .setColor("GREEN")
                .setThumbnail(guild.iconURL())
                .addField("Serwer ID", guild.id)
                .addField('Poranne wiadomości', `${client.botEmojis.get('off')} Wyłączone`, true)
                .addField('Urodzinowe wiadomości', `${client.botEmojis.get('off')} Wyłączone`, true)
                .addField('Levelowanie', `${client.botEmojis.get('on')} Włączone`, true)
                .addField('Komendy', `Aby zmienić ustawienia wpisz \`\`\`${client.botOptions.get("prefix")}config <1/2/3>\`\`\``)
                .setFooter(`⚙ ${guild.name}`)
            return message.channel.send({ embeds: [embed]})
        } else{
            if(args[0] == "<1/2/3>"){
                return message.channel.send(`Nie dosłownie.. Przykład komendy: \`\`\`${client.botOptions.get("prefix")}config 1\`\`\``)
            }
            if(args[0] == "1"){
                const embed = await new Discord.MessageEmbed()
                    .setDescription(`⚙ **Poranne wiadomości** zostały ${client.botEmojis.get('on')} Włączone`)
                return message.channel.send({ embeds: [embed]})
            }
            if(args[0] == "2"){
                const embed = await new Discord.MessageEmbed()
                    .setDescription(`⚙ **Urodzinowe wiadomości** zostały ${client.botEmojis.get('on')} Włączone`)
                return message.channel.send({ embeds: [embed]})
            }
            if(args[0] == "3"){
                const embed = await new Discord.MessageEmbed()
                    .setDescription(`⚙ **Levelowanie** zostało ${client.botEmojis.get('off')} Wyłączone`)
                return message.channel.send({ embeds: [embed]})
            }
        }
    }  
}