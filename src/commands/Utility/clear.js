module.exports = {
    name: "clear",
    alias: ['remove', 'erase', 'usun'],
    desc: "Usuwa x wiadomości z kanału",
    syntax: "[liczba wiadomości]",
    permissions: ['admin'],
    hidden: false,
    execute: async (message, args, client, Discord) => {
        if(!args[0]){
            return client.msg(message, {
                type: 'warning',
                message: 'Podaj liczbę wiadomości do usunięcia',
                example: 'clear 10'
            })
        }
        if(isNaN(args[0])){
            return client.msg(message, {
                type: 'error',
                message: 'Wpisz prawdziwy numer',
                example: 'clear 10'
            })
        }
        if(args[0] > 100){
            return client.msg(message, {
                type: 'warning',
                message: 'To dla mnie za dużo (max 100)'
            })
        }
        if(args[0] < 1){
            return client.msg(message, {
                type: 'warning',
                message: 'Wpisz liczbę wiadomości do usunięcia',
                example: 'clear 10'
            })
        }
        if(message.member.permissions.toArray().includes('ADMINISTRATOR')) {
            try{
                await message.channel.messages.fetch({limit: args[0]}).then(messages => {
                    message.channel.bulkDelete(messages)
                })
            }catch(err){
                console.error(err)
                message.channel.send("😖 Coś poszło nie tak, może wiadomości są starsze niż 14 dni? Nie mogę ich wtedy usunąć")
            }
        }else{
            return client.msg(message, {
                type: 'blocked',
                message: 'Nie masz uprawnień do wykonania tej komendy!'
            })
        }
    }  
}