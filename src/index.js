const Discord = require('discord.js')
const { readdirSync, read, readdir } = require('fs')
const { resolve } = require('path')
const db = require("quick.db")
const didYouMean = require('didyoumean2').default
require('dotenv').config({ path: resolve(__dirname, '.env') })

console.log("_________________________________________________")
console.log("________________ C E R B E R U S ________________")
console.log("_________________________________________________")

/* Modules */
const welcomeMessage = require("./modules/welcomeMessage")
const morningMessage = require("./modules/morningMessage")

const { prefix } = require("./config.js")

const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents })
client.commands = new Discord.Collection()

require( 'console-stamp' )( console, 'dd/mm/yy HH:MM' )
require('./handlers/commands.js')(client)


client.once('ready', async ()=>{
    console.log("[*] Cerberus is online!")
    console.log(`[*] Ready to serve on ${client.guilds.cache.size} servers, for ${client.users.cache.size} users.`)

    await require('./handlers/emojis.js')(client)
    await require('./handlers/helpers.js')(client)

    await require('./modules/covidStats.js')(client, Discord)

    //client.session = new Map()
    client.session = {}
    client.guilds.cache.forEach((server)=>{
        client.session[server.id] = {}
    })

    client.botOptions = new Map()
    client.botOptions.set('prefix', prefix)

})
const MINIMALIZM = []
client.on('messageCreate', async(message) => {

    if(message.channelId == "855435262352293928"){
        let author = message.author.username
        let content = message.content
        MINIMALIZM.push({author, content})
        console.log(`[minimalizm]`, author, content)
    }


    if(!message.content.startsWith(prefix) || message.author.bot) return
    try{
        const args = message.content.substring(prefix.length).split(/ +/)
        const commandArg = args.shift().toLowerCase()
        const command = client.commands.find(cmd => {
            if(cmd.name == commandArg) return cmd 
            const aliasCmd = cmd.alias ? cmd.alias.find((alias) => alias === commandArg) : false
            if(aliasCmd) return cmd
        })
        if(command == "minimalizm"){
            console.log(MINIMALIZM)
        }

        if(typeof command == "undefined"){
            let suggestion = didYouMean(commandArg, [...client.commands.keys()])
            if(suggestion){
                message.channel.send(`🤔 Nie ma takiej komendy, ale może chodziło Ci o \`${prefix}${suggestion}\``)
            }
        }else{
            console.log(`[*] Uruchomiono komendę: ${command.name} ${args.join(" ")}`)
            if(command.permissions.includes('admin') && !message.member.permissions.toArray().includes('ADMINISTRATOR')){
               return client.msg(message, {
                    type: 'blocked',
                    message: 'Nie masz uprawnień do wykonania tej komendy!'
                })
            }
            command.execute(message, args, client, Discord)
        }

    }catch(err){
        console.error(`[!][Message Error]`, err)
    }
})

client.login(process.env.BOT_TOKEN).catch((err)=>{
    console.error(`❌ Invalid Token! (${process.env.BOT_TOKEN})`, err)
})

client.on("error", (e) => console.error('[error]',e))
client.on("warn", (e) => console.warn('[warn]',e))