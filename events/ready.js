module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setActivity('Overwatch', { type: 'PLAYING' })
        console.log(`Logged in as ${client.user.tag}!`)
    }
}