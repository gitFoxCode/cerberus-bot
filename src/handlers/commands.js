
const { readdirSync } = require("fs")
const { join, resolve } = require('path')
module.exports = async (client) => {
    readdirSync(resolve(__dirname, `../commands/`)).forEach((dir)=>{
        const files = readdirSync(resolve(__dirname, `../commands/${dir}/`)).filter((file)=>{
            return file.endsWith(".js")
        })
        for (let file of files){
            let command = require(`../commands/${dir}/${file}`)
            if(command.name){
                client.commands.set(command.name, command)
            }else{
                console.warn(`[W] No command`, command)
            }
        }
    })
}