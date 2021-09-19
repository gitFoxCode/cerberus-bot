module.exports = {
    name: "drink",
    alias: [],
    desc: "imprezowa gra w pije ten kto..",
    syntax: "<type>",
    permissions: [],
    hidden: false,
    execute: async (message, args, client, Discord) => {
        let type = (args[0]  >= 0 && args[0] <= 2) ? args[0] :(Math.floor(Math.random() * 3))
        let drinkMessage = ""
        if(type == 0){
            drinkMessage = await require("../../data/games/drink/drinkif.json")
            drinkMessage = '**Pijesz jeżeli**: ' + drinkMessage[Math.floor(Math.random()*drinkMessage.length)]
        }
        if(type == 1){
            drinkMessage = await require("../../data/games/drink/drinkwho.json")
            drinkMessage = '**Pije ten kto**: ' + drinkMessage[Math.floor(Math.random()*drinkMessage.length)]
        }
        if(type == 2){
            drinkMessage = await require("../../data/games/drink/never.json")
            drinkMessage = '**Pijesz jeżeli zdanie jest __fałszywe__**: Ja nigdy nie ' + drinkMessage[Math.floor(Math.random()*drinkMessage.length)]
        }

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(drinkMessage)
        message.channel.send({embeds: [embed]}).then((msg)=>{
            if(type == 2){
                msg.react(`🍺`)
            }
        })
    }  
}