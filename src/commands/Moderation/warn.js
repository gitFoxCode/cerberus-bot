module.exports = {
    name: "warn",
    alias: [],
    desc: "Ostrżeżenie użytkownika",
    syntax: "[@user] <powód>",
    permissions: ['admin'],
    hidden: false,
    execute: async (message, args, client, Discord) => {
        if(args.length == 0) {
            return client.msg(message, {
            message: `Podaj argumenty!`, 
            type: "warning",
            example: 'warn @user spamowanie'})
        }
        
        const guild = client.guilds.cache.get(message.guildId)
        let warned = message.mentions.users.first() || false
        if(!warned){
            if(/^\d+$/.test(args[0])){
                warned = guild.members.cache.get(args[0].match(/\d+/)[0])
            }else{
                let users = await guild.members.fetch()
                warned = [...(users.filter((user)=>{
                    return user.user.username.toLowerCase() == args[0].toLowerCase() 
                })).values()][0].user
            }
        }
       
        if(warned){
            args.shift()
            const reason = `\`\`\`${args.join(" ")}\`\`\`` || false
            console.log('author',message.author)
            const embed = new Discord.MessageEmbed()
                    .setColor('#ebdf36')
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTitle(`${client.botEmojis.get('warning')} Ostrzeżenie dla użytkownika ${warned.username} ${client.botEmojis.get('warning')}`)
                    .addField("**Ostrzeżenie**", `${warned}`, true)
                    .addField("**ID**", `${warned.id}`, true)                    

                    .addField("**Data**", message.createdAt.toLocaleString(), true)
                    .addField("**Ostrzeżony przez**", `${message.author}`, true)
                    .addField("Ostrzeżeń", `**1**/3`, true)
                    .addField("**Powód**", `${reason || "Brak powodu"}`)
                    .setTimestamp()
            return message.channel.send({embeds: [embed]})
        }else{
            return client.msg(message, {
                message: `Źle oznaczono użytkownika!`, 
                type: "error"})
        }
    }  
}