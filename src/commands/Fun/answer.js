module.exports = {
    name: "answer",
    alias: ['pytanie', 'odpowiedz', 'q', 'question'],
    desc: "Zadaj pytanie botowi tak/nie",
    syntax: "[pytanie]",
    permissions: [],
    hidden: false,
    execute: async (message, args, client) => {
        if(args.join("").includes("?")){
            const answers = await require('../../data/pl/answer.json')
            message.channel.send(answers[Math.floor(Math.random() * (answers.length - 1 - 0)) + 0])
        }else{
            client.msg(message, {
                type: 'warning',
                message: 'Pytanie powinno zawierać pytajnik `?`.',
                example: 'answer czy dzisiaj będzie padać?'
            })
        }
    }  
}