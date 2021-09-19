const cron = require('cron')

module.exports = async (client, Discord) => {
    const channelId = "814549047708614730" // TODO: Zmienić na kanał opcjonalny
    const channel = client.channels.cache.get(channelId)
    const scheduledMessage = new cron.CronJob('35 10 * * *', async () => {
        const command = client.commands.get('covid')
        command.execute({ channel }, null, client, Discord)
    })
    scheduledMessage.start()
}