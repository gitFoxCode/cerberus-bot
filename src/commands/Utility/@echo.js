module.exports = {
    name: "@echo",
    alias: ['text'],
    desc: "Napisanie wiadomości (kasuje twoją)",
    syntax: "[text]",
    permissions: [],
    hidden: true,
    execute: async (message, args, client) => {
        try{
            message.delete()
            return message.channel.send(args.join(" "))
        }catch(err){
            console.error(err)
        }
    }  
}
