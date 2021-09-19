const axios = require('axios')

module.exports = {
    name: "covid",
    alias: ['c19', 'covid19'],
    desc: "Statystyki covid19",
    syntax: "[text]",
    permissions: [],
    hidden: false,
    execute: async (message, args, client, Discord) => {
        const sending = await message.channel.send(client.processing('Przetwarzam...'))
        try{
            const data =  (await axios.get(`https://coronavirus-19-api.herokuapp.com/countries/Poland`)).data
            const embed = new Discord.MessageEmbed()
                .setColor(('#ad2a21'))
                .setTitle(`📋 COVID19 STATYSTYKI - DZISIAJ 📊`)
                .addField('Zakażeń:', data.todayCases.toString(), true)
                .addField('Śmierci:', data.todayDeaths.toString(), true)

            sending.edit({embeds: [embed]})
        }catch(err){
            console.log(err)
        }

    }  
}