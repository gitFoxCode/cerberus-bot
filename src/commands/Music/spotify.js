const lyricsFinder = require('lyrics-finder')

module.exports = {
    name: "spotify",
    alias: ['lyrics'],
    desc: "Informacje o piosence ze spotify + tekst",
    syntax: "<@user>",
    permissions: [],
    hidden: false,
    execute: async (message, args, client, Discord) => {
        const guild = client.guilds.cache.get(message.guildId)
        let user = message.mentions.users.first() || message.author
        user = guild.members.cache.get(user.id)
        let songname = ""
        let author = ""
        
        try{
            if (user.presence.activities !== null){
                for (const activity of user.presence.activities){
                    if(activity.type == "LISTENING"){
                        songname = activity.details
                        author = activity.state
                        if (activity.type === 'LISTENING' && activity.name === 'Spotify' && activity.assets !== null) {
                            let trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`
                            let trackURL = `https://open.spotify.com/track/${activity.syncID}`
                            
                            let trackName = activity.details
                            let trackAuthor = activity.state
                            let trackAlbum = activity.assets.largeText

                            const msg = await message.channel.send(client.processing('Przetwarzam...'))
                            
                            let lyrics = await lyricsFinder(trackAuthor, trackName) || "Nie znaleziono!"

                            if(lyrics.length >= 1024){
                                lyrics = lyrics.slice(0,1020) + "..."
                            }

                            const embed = await new Discord.MessageEmbed()
                                .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
                                .setColor("GREEN")
                                .setThumbnail(trackIMG)
                                .addField('Tytuł', trackName, true)
                                .addField('Album', trackAlbum, true)
                                .addField('Autor', trackAuthor, false)
                                .addField('Posłuchaj', `${trackURL}`, false)
                                .addField('Tekst', lyrics, false )
                                .setFooter(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
                            return msg.edit({ embeds: [embed]})
                        }
                    }
                }
                if(songname == ""){
                    return client.msg(message, {
                        type: "warning",
                        message: "Ten użytkownik nic nie słucha na spotify."
                    })   
                }
            }else{
                return client.msg(message, {
                    type: "warning",
                    message: "Ten użytkownik nic nie słucha."
                })  
            }
            
        }catch(err){
            console.error(err)
            client.msg(message, {
                type: 'error',
                message: 'Wystąpił błąd!'
            })
        }
    }  
}