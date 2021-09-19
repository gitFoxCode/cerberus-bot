let QUESTIONS = []

module.exports = {
    name: "millionaires ",
    alias: ['m'],
    desc: "Gra w milionerów",
    syntax: "",
    permissions: [],
    hidden: false,
    execute: async (message, args, client, Discord) => {
        const subcommand = args.length ? args[0].toLowerCase() : ""
        const prefix = client.botOptions.get('prefix')
        const defaultOptions = {
            player: null,
            money: 0,
            helpers: ['50/50', 'public', 'change'],
            question: '',
            get reset(){
                this.player = null,
                this.helpers = ['50/50', 'public', 'change'],
                this.question = ""
            }
        }
        const player = message.author
        const server = message.guildId
        const GAME = client.session[server].millionaires || defaultOptions
        client.session[server].millionaires = GAME

        QUESTIONS = QUESTIONS.length ? QUESTIONS : await require("../../data/games/millionaires/pl/questions.json")

        const embed = new Discord.MessageEmbed()
        embed.setColor(`#bd8500`)
        embed.setTitle("💰 [ Milionerzy ] 💰")

        if(subcommand == "start"){
            
            if(GAME.player){
                embed.setDescription(`${client.botEmojis.get('blocked')} Obecnie już gra ${GAME.player}!`)
            } else{
                GAME.player = message.author
                embed.setDescription(`✅ Do gry dołączył ${GAME.player}!\nPrzygotuj się, za chwilę pojawi się pierwsze pytanie!`)
                setTimeout(()=>{
                    getQuestion(0)
                    console.log(client.session[server])
                }, 2000)
            }

            return message.channel.send({ embeds: [embed]})
        }else{
            const msg = `**Komendy:**`+
                `\n**${prefix}m start** - startujesz grę`+
                `\n**${prefix}m help** - koła ratunkowe`+
                `\n**${prefix}m repeat** - potwórz pytanie`+
                `\n**${prefix}m leave** - opuszczasz grę`+
                `\n**${prefix}m stage** - sprawdzasz na jakim jesteś poziomie gry`+
                `\n**${prefix}m board** - tablica wygranych`
            embed.setDescription(msg)
            embed.setFooter(`Aby zacząć wpisz ${prefix}m start`)
            return message.channel.send({ embeds: [embed]})
        }







        function getQuestion(stage){ 
            if(stage > 11){
                const embed = new Discord.MessageEmbed()
                embed.setColor(`#bd8500`)
                embed.setTitle("💰 [ Milionerzy ] 💰")
                embed.setDescription(`**GRATULACJE!** Wygrałeś okrągły **milion**!`)
                embed.addField('Gracz', `${GAME.player}`, true)
                embed.addField('Wygrana', `${GAME.money}$`, true)
                GAME.reset
                return message.channel.send({embeds: [embed]})
            }
            const stageQuestions = QUESTIONS[stage].questions
            GAME.question = stageQuestions[Math.floor(Math.random() * stageQuestions.length)]
            GAME.question.money = QUESTIONS[stage].money
            GAME.question.answers = shuffleArray( [].concat(GAME.question.a, GAME.question.q) )
            GAME.question.stage = stage
            createQuestion()
        }
        function createQuestion(){
            const embed = new Discord.MessageEmbed()
            embed.setColor(`#bd8500`)
            embed.setTitle("💰 [ Milionerzy ] 💰")
            let stage = ""
            if(GAME.question.stage != 0){
                stage = `${client.botEmojis.get('on')}`.repeat(GAME.question.stage).padEnd(300,`${client.botEmojis.get('off')}`) + `\n`
                console.log(stage)
                console.log(client.botEmojis.get('off'))
            }
            const msg = `${stage}❔ Pytanie nr. **${GAME.question.stage + 1}** o **${GAME.question.money}** 💵:`
            const question = `${GAME.question.contents}`
            let answers = ""
            GAME.question.answers.forEach((answer, i)=>{
                answers += `**${String.fromCharCode(65 + i)}.** ${answer}\n`
            })
            embed.setDescription(msg)
            embed.addField('Pytanie', question)
            embed.addField('Odpowiedzi', answers)

            const row = new Discord.MessageActionRow()

            const button_A = new Discord.MessageButton()
                .setCustomId('A')
                .setLabel(`A`)
                .setStyle('PRIMARY')
            const button_B = new Discord.MessageButton()
                .setCustomId('B')
                .setLabel('B')
                .setStyle('PRIMARY')
            const button_C = new Discord.MessageButton()
                .setCustomId('C')
                .setLabel('C')
                .setStyle('PRIMARY')
            const button_D = new Discord.MessageButton()
                .setCustomId('D')
                .setLabel('D')
                .setStyle('PRIMARY')
            const button_help = new Discord.MessageButton()
                .setCustomId('help')
                .setStyle('SECONDARY')
                .setEmoji(`${client.botEmojis.get('help')}`)
            if(GAME.helpers.length == 0){
                button_help.setDisabled(true)
            }

            if(GAME.question.answers.length > 2){
                row.addComponents(button_A, button_B, button_C, button_D, button_help)
            }else{
                row.addComponents(button_A, button_B, button_help)
            }

            //console.log(row)
            /* Button Handler */
            const filter = (interaction) => interaction.user.id === message.author.id
            
            const collector = message.channel.createMessageComponentCollector({
                filter, max: 1
            })

            collector.on("end", async (interaction) => {
                interaction = [...interaction.values()][0]
                if(GAME.player){
                    if(GAME.player.id == interaction.user.id ){
                        if(interaction.customId == 'help'){
                            await interaction.message.edit(getHelp())
                            await interaction.deferUpdate()
                        }else{
                            if( answer(interaction.customId) ){
                                console.log("POPRAWNA ODPOWIEDZ :)")
                                GAME.money = GAME.question.money
                                row.components[interaction.customId.charCodeAt()-65].style = "SUCCESS"
                                await interaction.message.edit({components: [row]})
                                await interaction.deferUpdate()
                                return getQuestion(GAME.question.stage+1)
                            }else{
                                console.log("NIEPOPRAWNA ODPOWIEDZ :)")
                                row.components[interaction.customId.charCodeAt()-65].style = "DANGER"
                                await interaction.message.edit({components: [row]})
                                await interaction.deferUpdate()
                                const loserEmbed = new Discord.MessageEmbed()
                                loserEmbed.setColor(`#bd8500`)
                                loserEmbed.setTitle("💰 [ Milionerzy ] 💰")
                                loserEmbed.setDescription(`❌ Niestety, odpowiedź **${interaction.customId}** - **${GAME.question.answers[interaction.customId.charCodeAt()-65 ]}** jest **nieprawidłowa**`)
                                loserEmbed.addField('Gracz', `${GAME.player}`, true)
                                loserEmbed.addField('Wygrana', `${GAME.money}$`, true)
                                loserEmbed.addField('Poprawna odpowiedź', `${GAME.question.a}`)
                                GAME.reset
                                return message.channel.send({embeds: [loserEmbed]})
                            }
                        }
                    }else{
                        await interaction.deferUpdate()
                    }
                }else{
                    await interaction.deferUpdate()
                }
            })
            return message.channel.send({ embeds: [embed], components: [row]})
        }
        function answer(letter){
            let index = letter.charCodeAt()-65 
            if( GAME.question.answers[index] == GAME.question.a){
                return true
            }else{
                return false
            }
        }
        function getHelp(){
            const embed = new Discord.MessageEmbed()
            embed.setColor(`#bd8500`)
            embed.setTitle("💰 [ Milionerzy ] 💰")
            embed.addField("📊 Pomoc Publiczności", "Zapytaj o pomoc publiczności")
            embed.addField('➗ 50/50', 'Zostaw tylko dwie możliwe odpowiedzi')
            embed.addField('🔀 Wymiana', 'Wymień pytanie na inne')
            const row = new Discord.MessageActionRow()
            const helpPublic = new Discord.MessageButton()
            .setCustomId('public')
            .setStyle('PRIMARY')
            .setLabel('Publiczność')
            .setEmoji(`📊`)
            if(!GAME.helpers.includes('public')){
                helpPublic.setDisabled(true)
            }
            const helpFifty = new Discord.MessageButton()
            .setCustomId('50/50')
            .setStyle('PRIMARY')
            .setLabel('50/50')
            .setEmoji(`➗`)
            if(!GAME.helpers.includes('50/50')){
                helpFifty.setDisabled(true)
            }
            const helpChange = new Discord.MessageButton()
            .setCustomId('change')
            .setStyle('PRIMARY')
            .setLabel('Zmiana')
            .setEmoji(`🔀`)
            if(!GAME.helpers.includes('change')){
                helpChange.setDisabled(true)
            }
            const cancel = new Discord.MessageButton()
            .setCustomId('cancel')
            .setStyle('DANGER')
            .setLabel('Powrót')
            .setEmoji(`❌`)
            row.addComponents(helpPublic, helpFifty, helpChange, cancel)
            const filter = (interaction) => interaction.user.id === message.author.id
            
            const collector = message.channel.createMessageComponentCollector({
                filter, max: 1
            })
            collector.on("end", async (interaction) => {
                interaction = interaction = [...interaction.values()][0]
                if(GAME.player.id == interaction.user.id ){
                    // if(interaction.customId == "cancel"){
                    //     return createQuestion()
                    // }
                    if(GAME.helpers.includes(interaction.customId)){
                        GAME.helpers = GAME.helpers.filter(helper => helper !== interaction.customId)
                        if(interaction.customId == "public"){
                            const publicEmbed = new Discord.MessageEmbed()
                            publicEmbed.setColor(`#bd8500`)
                            publicEmbed.setTitle("💰 [ Publiczność ] 💰")
                            publicEmbed.setDescription(publicHelp(GAME.question.answers, GAME.question.a))
                            interaction.message.edit({embeds: [publicEmbed]})
                        }
                        if(interaction.customId == "50/50"){
                           GAME.question.answers = fifyFifty(GAME.question.answers, GAME.question.a)
                        }
                        if(interaction.customId == "change"){
                            getQuestion(GAME.question.stage) 
                        }
                    }
                }
                await interaction.deferUpdate()
                createQuestion()
            })
            return {embeds: [embed], components: [row]}
        }
    }  
}

function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}
function fifyFifty (answers, goodAnswer){
    const wrongAnswers = answers.filter( a => a !== goodAnswer)
    const randomAnswer = wrongAnswers[Math.floor(Math.random()*wrongAnswers.length)]
    return [randomAnswer, goodAnswer]
}
function publicHelp(answers, goodAnswer){
   // let possibilities = new Map()

    //let correct = String.fromCharCode(answers.indexOf(goodAnswer) + 65)

    let numbers = [Math.random(), Math.random(), Math.random(), Math.random()]
    let sum = numbers.reduce((sum, val) => sum + val);
    let final = numbers.map(val => Math.round(val / sum * 100));
    
    let msg = "To jest totalnie losowe, jeszcze tego nie stworzylem xD\n"
    answers.forEach((answer, i)=>{
        msg += `${String.fromCharCode(i + 65)} [${'\\|'.repeat(final[i] / 10).padEnd(10, "\ ")}] ${final[i]}% \n`
    })
    return msg
}