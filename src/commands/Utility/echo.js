module.exports = {
    name: "echo",
    alias: ['text'],
    desc: "Napisanie wiadomości",
    syntax: "[text]",
    permissions: [],
    hidden: false,
    execute: async (message, args, client) => {
        message.channel.send(args.join(" "))
    }  
}